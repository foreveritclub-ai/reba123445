import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  BookOpen,
  Users,
  FileText,
  Star,
  TrendingUp,
  DollarSign,
  Briefcase,
  Package
} from "lucide-react";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const [
        messagesRes,
        coursesRes,
        blogRes,
        testimonialsRes,
        enrollmentsRes,
        partnersRes,
        productsRes,
        projectsRes
      ] = await Promise.all([
        supabase.from("contact_submissions").select("id", { count: "exact" }),
        supabase.from("courses").select("id", { count: "exact" }),
        supabase.from("blog_posts").select("id", { count: "exact" }),
        supabase.from("testimonials_managed").select("id", { count: "exact" }),
        supabase.from("enrollments").select("id", { count: "exact" }),
        supabase.from("partners").select("id", { count: "exact" }),
        supabase.from("products").select("id", { count: "exact" }),
        supabase.from("completed_projects").select("id", { count: "exact" })
      ]);

      return {
        messages: messagesRes.count || 0,
        courses: coursesRes.count || 0,
        blogs: blogRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        enrollments: enrollmentsRes.count || 0,
        partners: partnersRes.count || 0,
        products: productsRes.count || 0,
        projects: projectsRes.count || 0
      };
    }
  });

  const { data: recentMessages } = useQuery({
    queryKey: ["recent-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  const { data: recentEnrollments } = useQuery({
    queryKey: ["recent-enrollments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          *,
          courses (title)
        `)
        .order("enrolled_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  const statCards = [
    { label: "Messages", value: stats?.messages, icon: MessageSquare, color: "text-blue-500" },
    { label: "Courses", value: stats?.courses, icon: BookOpen, color: "text-green-500" },
    { label: "Blog Posts", value: stats?.blogs, icon: FileText, color: "text-purple-500" },
    { label: "Enrollments", value: stats?.enrollments, icon: Users, color: "text-orange-500" },
    { label: "Testimonials", value: stats?.testimonials, icon: Star, color: "text-yellow-500" },
    { label: "Partners", value: stats?.partners, icon: Briefcase, color: "text-indigo-500" },
    { label: "Products", value: stats?.products, icon: Package, color: "text-pink-500" },
    { label: "Projects", value: stats?.projects, icon: TrendingUp, color: "text-cyan-500" }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages && recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{msg.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent messages</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentEnrollments && recentEnrollments.length > 0 ? (
              <div className="space-y-3">
                {recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm line-clamp-1">
                        {enrollment.courses?.title || "Unknown Course"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${enrollment.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {enrollment.progress || 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent enrollments</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
