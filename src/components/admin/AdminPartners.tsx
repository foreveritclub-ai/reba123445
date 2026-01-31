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
import { Briefcase, Plus, Edit, Trash2, ExternalLink } from "lucide-react";

const AdminPartners = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: partners, isLoading } = useQuery({
    queryKey: ["admin-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const createPartner = useMutation({
    mutationFn: async (partner: any) => {
      const { error } = await supabase.from("partners").insert({
        name: partner.name,
        description: partner.description,
        logo_url: partner.logo_url,
        website_url: partner.website_url,
        display_order: partner.display_order,
        is_active: partner.is_active
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      toast({ title: "Partner created successfully" });
      setIsDialogOpen(false);
      setEditingPartner(null);
      setIsCreating(false);
    },
    onError: (error) => {
      toast({ title: "Error creating partner", description: error.message, variant: "destructive" });
    }
  });

  const updatePartner = useMutation({
    mutationFn: async (partner: any) => {
      const { error } = await supabase
        .from("partners")
        .update({
          name: partner.name,
          description: partner.description,
          logo_url: partner.logo_url,
          website_url: partner.website_url,
          display_order: partner.display_order,
          is_active: partner.is_active
        })
        .eq("id", partner.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      toast({ title: "Partner updated successfully" });
      setIsDialogOpen(false);
      setEditingPartner(null);
    },
    onError: (error) => {
      toast({ title: "Error updating partner", description: error.message, variant: "destructive" });
    }
  });

  const deletePartner = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("partners").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      toast({ title: "Partner deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting partner", description: error.message, variant: "destructive" });
    }
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPartner({
      name: "",
      description: "",
      logo_url: "",
      website_url: "",
      display_order: (partners?.length || 0) + 1,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (partner: any) => {
    setIsCreating(false);
    setEditingPartner({ ...partner });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPartner) {
      if (isCreating) {
        createPartner.mutate(editingPartner);
      } else {
        updatePartner.mutate(editingPartner);
      }
    }
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
        <h2 className="text-xl font-bold">Manage Partners</h2>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {!partners || partners.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Partners Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first partner to get started.
            </p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Partner
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {partners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {partner.logo_url && (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="w-16 h-16 object-contain rounded-lg bg-muted p-2"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{partner.name}</h3>
                      <Badge variant={partner.is_active ? "default" : "secondary"}>
                        {partner.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                      {partner.description}
                    </p>
                    {partner.website_url && (
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {partner.website_url}
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePartner.mutate(partner.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Add Partner" : "Edit Partner"}</DialogTitle>
          </DialogHeader>
          {editingPartner && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingPartner.description || ""}
                  onChange={(e) => setEditingPartner({ ...editingPartner, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  value={editingPartner.logo_url || ""}
                  onChange={(e) => setEditingPartner({ ...editingPartner, logo_url: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  value={editingPartner.website_url || ""}
                  onChange={(e) => setEditingPartner({ ...editingPartner, website_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingPartner.display_order || 0}
                  onChange={(e) => setEditingPartner({ ...editingPartner, display_order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={editingPartner.is_active}
                  onCheckedChange={(checked) => setEditingPartner({ ...editingPartner, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={createPartner.isPending || updatePartner.isPending}
                >
                  {createPartner.isPending || updatePartner.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPartners;
