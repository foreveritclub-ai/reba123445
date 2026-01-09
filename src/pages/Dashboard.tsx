import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Clock, Award, LogOut, User } from "lucide-react";
import { toast } from "sonner";

interface Enrollment {
  id: string;
  enrolled_at: string;
  progress: number;
  course: {
    id: string;
    slug: string;
    title: string;
    instructor: string;
    level: string;
    duration_hours: number | null;
  };
}

interface Profile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch enrollments with course data
      const { data: enrollmentsData, error } = await supabase
        .from("enrollments")
        .select(`
          id,
          enrolled_at,
          progress,
          course:courses(id, slug, title, instructor, level, duration_hours)
        `)
        .eq("user_id", user!.id)
        .order("enrolled_at", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedEnrollments = (enrollmentsData || []).map((e: any) => ({
        ...e,
        course: e.course
      }));
      
      setEnrollments(transformedEnrollments);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-foreground">Egreed</span>
            <span className="text-primary"> Technology</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <div className="font-medium text-sm">{profile?.full_name || "Student"}</div>
                <div className="text-xs text-muted-foreground">{profile?.email}</div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name?.split(" ")[0] || "Student"}!</h1>
          <p className="text-muted-foreground mb-8">Continue your learning journey</p>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{enrollments.length}</div>
                  <div className="text-sm text-muted-foreground">Enrolled Courses</div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {enrollments.reduce((acc, e) => acc + (e.course?.duration_hours || 0), 0)}h
                  </div>
                  <div className="text-sm text-muted-foreground">Total Learning</div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {enrollments.filter((e) => e.progress === 100).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <h2 className="text-xl font-bold mb-6">My Courses</h2>
          
          {enrollments.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course</p>
              <Link
                to="/#courses"
                className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:glow-primary transition-all"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  to={`/courses/${enrollment.course?.slug}`}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      enrollment.course?.level === "beginner" ? "bg-green-500/20 text-green-400" :
                      enrollment.course?.level === "intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {enrollment.course?.level}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {enrollment.course?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{enrollment.course?.instructor}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-medium">{enrollment.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${enrollment.progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
