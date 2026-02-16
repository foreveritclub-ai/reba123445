import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CaseStudyForm {
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  category: string;
  challenge: string;
  solution: string;
  results: string;
  tags: string;
  is_published: boolean;
}

const empty: CaseStudyForm = {
  title: "", slug: "", client_name: "", industry: "", category: "AI & Machine Learning",
  challenge: "", solution: "", results: "", tags: "", is_published: true,
};

const AdminCaseStudies = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<CaseStudyForm>(empty);

  const { data: studies = [], isLoading } = useQuery({
    queryKey: ["admin-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("case_studies").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.challenge || !form.solution || !form.results) {
      toast({ title: "Missing fields", description: "Fill in all required fields.", variant: "destructive" });
      return;
    }
    const payload = {
      title: form.title,
      slug: form.slug,
      client_name: form.client_name || null,
      industry: form.industry || null,
      category: form.category,
      challenge: form.challenge,
      solution: form.solution,
      results: form.results,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      is_published: form.is_published,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("case_studies").update(payload).eq("id", editing));
    } else {
      ({ error } = await supabase.from("case_studies").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing ? "Updated" : "Created" });
      qc.invalidateQueries({ queryKey: ["admin-case-studies"] });
      setOpen(false);
      setEditing(null);
      setForm(empty);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("case_studies").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted" });
      qc.invalidateQueries({ queryKey: ["admin-case-studies"] });
    }
  };

  const handleEdit = (s: any) => {
    setEditing(s.id);
    setForm({
      title: s.title, slug: s.slug, client_name: s.client_name || "",
      industry: s.industry || "", category: s.category,
      challenge: s.challenge, solution: s.solution, results: s.results,
      tags: (s.tags || []).join(", "), is_published: s.is_published,
    });
    setOpen(true);
  };

  const togglePublished = async (id: string, current: boolean) => {
    await supabase.from("case_studies").update({ is_published: !current }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-case-studies"] });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Case Studies ({studies.length})</CardTitle>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditing(null); setForm(empty); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Add Case Study</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "New"} Case Study</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              <Input placeholder="Slug *" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Client Name" value={form.client_name} onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))} />
                <Input placeholder="Industry" value={form.industry} onChange={e => setForm(p => ({ ...p, industry: e.target.value }))} />
              </div>
              <Input placeholder="Category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} />
              <Textarea placeholder="Challenge *" rows={3} value={form.challenge} onChange={e => setForm(p => ({ ...p, challenge: e.target.value }))} />
              <Textarea placeholder="Solution *" rows={3} value={form.solution} onChange={e => setForm(p => ({ ...p, solution: e.target.value }))} />
              <Textarea placeholder="Results *" rows={3} value={form.results} onChange={e => setForm(p => ({ ...p, results: e.target.value }))} />
              <Input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
              <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
          <div className="space-y-3">
            {studies.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.category} • {s.client_name || "No client"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublished(s.id, s.is_published)}>
                    {s.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminCaseStudies;
