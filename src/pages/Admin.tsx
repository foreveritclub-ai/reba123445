import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  MessageSquare,
  BookOpen,
  Users,
  FileText,
  Star,
  Settings,
  LogOut,
  Shield,
  AlertCircle,
  LayoutDashboard,
  Briefcase,
  Package,
  FolderGit2,
  Home,
  FlaskConical
} from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminPartners from "@/components/admin/AdminPartners";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminCaseStudies from "@/components/admin/AdminCaseStudies";

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check if user is admin
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking role:", error);
        return null;
      }
      
      return data;
    },
    enabled: !!user?.id
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    if (!roleLoading) {
      setIsAdmin(!!userRole);
    }
  }, [user, userRole, roleLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              You don't have permission to access the admin dashboard.
              Please contact an administrator if you believe this is an error.
            </p>
            <div className="space-y-2">
              <Button onClick={() => navigate("/")} className="w-full">
                Go to Homepage
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Egreed Technology</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground hidden md:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 h-auto p-2 bg-muted">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-2 px-3">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 py-2 px-3">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 py-2 px-3">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 py-2 px-3">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2 py-2 px-3">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="flex items-center gap-2 py-2 px-3">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Partners</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2 py-2 px-3">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 py-2 px-3">
              <FolderGit2 className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="flex items-center gap-2 py-2 px-3">
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Case Studies</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="messages">
            <AdminMessages />
          </TabsContent>

          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>

          <TabsContent value="blog">
            <AdminBlog />
          </TabsContent>

          <TabsContent value="testimonials">
            <AdminTestimonials />
          </TabsContent>

          <TabsContent value="partners">
            <AdminPartners />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>

          <TabsContent value="case-studies">
            <AdminCaseStudies />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
