import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Plus, Edit, Eye, EyeOff, Calendar } from "lucide-react";

const AdminBlog = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const createPost = useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase.from("blog_posts").insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        is_published: post.is_published
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({ title: "Blog post created successfully" });
      setIsDialogOpen(false);
      setEditingPost(null);
      setIsCreating(false);
    },
    onError: (error) => {
      toast({ title: "Error creating post", description: error.message, variant: "destructive" });
    }
  });

  const updatePost = useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          author: post.author,
          is_published: post.is_published
        })
        .eq("id", post.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({ title: "Blog post updated successfully" });
      setIsDialogOpen(false);
      setEditingPost(null);
    },
    onError: (error) => {
      toast({ title: "Error updating post", description: error.message, variant: "destructive" });
    }
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Cloud Solutions",
      author: "Egreed Technology Team",
      is_published: true
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (post: any) => {
    setIsCreating(false);
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPost) {
      if (isCreating) {
        createPost.mutate(editingPost);
      } else {
        updatePost.mutate(editingPost);
      }
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manage Blog Posts</h2>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {!posts || posts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first blog post to get started.
            </p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <Badge variant={post.is_published ? "default" : "secondary"}>
                        {post.is_published ? "Published" : "Draft"}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span>By {post.author}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create Blog Post" : "Edit Blog Post"}</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingPost.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setEditingPost({
                      ...editingPost,
                      title: newTitle,
                      slug: isCreating ? generateSlug(newTitle) : editingPost.slug
                    });
                  }}
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={editingPost.excerpt || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea
                  id="content"
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={10}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={editingPost.is_published}
                  onCheckedChange={(checked) => setEditingPost({ ...editingPost, is_published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={createPost.isPending || updatePost.isPending}
                >
                  {createPost.isPending || updatePost.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
