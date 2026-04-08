import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Eye, GraduationCap, Users, Clock, FileText } from "lucide-react";

const AdminInternships = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["admin-internships"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("internship_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = (applications as any[]).filter((a: any) => {
    const matchSearch = a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.institution.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "all" || a.education_level === filterLevel;
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchLevel && matchStatus;
  });

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("internship_applications")
      .update({ status } as any)
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Status Updated" });
      refetch();
      if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status });
    }
  };

  const exportCsv = () => {
    const headers = ["Full Name", "Email", "Phone", "Education Level", "Program", "Institution", "Level", "Shift", "Status", "Applied"];
    const rows = filtered.map((a: any) => [
      a.full_name, a.email, a.phone, a.education_level, a.course_program,
      a.institution, a.current_level, a.preferred_shift, a.status,
      new Date(a.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map((c: string) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "internship-applications.csv";
    a.click();
  };

  const stats = {
    total: (applications as any[]).length,
    pending: (applications as any[]).filter((a: any) => a.status === "pending").length,
    tvet: (applications as any[]).filter((a: any) => a.education_level === "TVET").length,
    university: (applications as any[]).filter((a: any) => a.education_level === "University").length,
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "reviewed": return "bg-blue-100 text-blue-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="pt-4 text-center">
          <Users className="w-6 h-6 text-primary mx-auto mb-1" />
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </CardContent></Card>
        <Card><CardContent className="pt-4 text-center">
          <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-2xl font-bold">{stats.pending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </CardContent></Card>
        <Card><CardContent className="pt-4 text-center">
          <GraduationCap className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <p className="text-2xl font-bold">{stats.tvet}</p>
          <p className="text-xs text-muted-foreground">TVET</p>
        </CardContent></Card>
        <Card><CardContent className="pt-4 text-center">
          <GraduationCap className="w-6 h-6 text-purple-500 mx-auto mb-1" />
          <p className="text-2xl font-bold">{stats.university}</p>
          <p className="text-xs text-muted-foreground">University</p>
        </CardContent></Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" /> Internship Applications
            </CardTitle>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search name, email, institution..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="TVET">TVET</SelectItem>
                <SelectItem value="University">University</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No applications found</TableCell></TableRow>
                ) : (
                  filtered.map((app: any) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.full_name}</p>
                          <p className="text-xs text-muted-foreground">{app.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{app.course_program}</TableCell>
                      <TableCell><Badge variant="outline">{app.education_level}</Badge></TableCell>
                      <TableCell className="text-sm">{app.preferred_shift}</TableCell>
                      <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(app.status)}`}>{app.status}</span></TableCell>
                      <TableCell className="text-sm">{new Date(app.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => setSelectedApp(app)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          {app.cv_url && (
                            <a href={app.cv_url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button>
                            </a>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span><p className="font-medium">{selectedApp.full_name}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p className="font-medium">{selectedApp.email}</p></div>
                <div><span className="text-muted-foreground">Phone:</span><p className="font-medium">{selectedApp.phone}</p></div>
                <div><span className="text-muted-foreground">DOB:</span><p className="font-medium">{selectedApp.date_of_birth}</p></div>
                <div className="col-span-2"><span className="text-muted-foreground">Address:</span><p className="font-medium">{selectedApp.address}</p></div>
                <div><span className="text-muted-foreground">Education:</span><p className="font-medium">{selectedApp.education_level}</p></div>
                <div><span className="text-muted-foreground">Program:</span><p className="font-medium">{selectedApp.course_program}</p></div>
                <div><span className="text-muted-foreground">Level:</span><p className="font-medium">{selectedApp.current_level}</p></div>
                <div><span className="text-muted-foreground">Institution:</span><p className="font-medium">{selectedApp.institution}</p></div>
                <div><span className="text-muted-foreground">Shift:</span><p className="font-medium">{selectedApp.preferred_shift}</p></div>
                {selectedApp.portfolio_link && (
                  <div className="col-span-2"><span className="text-muted-foreground">Portfolio:</span><p><a href={selectedApp.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-primary underline">{selectedApp.portfolio_link}</a></p></div>
                )}
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Motivation:</span>
                <p className="mt-1 text-sm bg-muted/50 p-3 rounded-lg">{selectedApp.motivation_statement}</p>
              </div>
              {selectedApp.cv_url && (
                <a href={selectedApp.cv_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full"><Download className="w-4 h-4 mr-2" /> Download CV</Button>
                </a>
              )}
              <div>
                <span className="text-sm text-muted-foreground block mb-2">Update Status:</span>
                <div className="flex gap-2 flex-wrap">
                  {["pending", "reviewed", "accepted", "rejected"].map(s => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selectedApp.status === s ? "default" : "outline"}
                      onClick={() => updateStatus(selectedApp.id, s)}
                      className="capitalize"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInternships;
