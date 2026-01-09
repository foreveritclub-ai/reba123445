import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Clock, 
  Award, 
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  Play,
  Smartphone
} from "lucide-react";
import { toast } from "sonner";
import MobilePayment from "@/components/MobilePayment";
import egreedLogo from "@/assets/egreed-logo.png";

interface CourseModule {
  module: string;
  lessons: string[];
}

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  description: string;
  long_description: string | null;
  tags: string[];
  rating: number;
  reviews_count: number;
  students_count: number;
  features: string[];
  price: number;
  original_price: number | null;
  level: string;
  is_trending: boolean;
  has_certificate: boolean;
  curriculum: CourseModule[];
  instructor_bio: string | null;
  duration_hours: number | null;
}

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  const fetchCourse = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        navigate("/");
        return;
      }

      // Parse curriculum JSON safely
      let parsedCurriculum: CourseModule[] = [];
      if (data.curriculum && Array.isArray(data.curriculum)) {
        parsedCurriculum = data.curriculum as unknown as CourseModule[];
      }

      const courseData: Course = {
        ...data,
        curriculum: parsedCurriculum,
      };

      setCourse(courseData);
    } catch (error) {
      console.error("Error fetching course:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user || !course) return;

    const { data } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .maybeSingle();

    setIsEnrolled(!!data);
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please sign in to enroll");
      navigate("/signin");
      return;
    }

    if (!course) return;

    // Show payment modal for paid courses
    if (course.price > 0) {
      setShowPayment(true);
      return;
    }

    // Free enrollment
    setEnrolling(true);
    try {
      const { error } = await supabase.from("enrollments").insert({
        user_id: user.id,
        course_id: course.id,
      });

      if (error) throw error;

      toast.success("Successfully enrolled!");
      setIsEnrolled(true);
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("You're already enrolled in this course");
      } else {
        toast.error("Failed to enroll. Please try again.");
      }
    } finally {
      setEnrolling(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setIsEnrolled(true);
  };

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) return null;

  const levelColors = {
    beginner: "bg-green-500/20 text-green-400",
    intermediate: "bg-yellow-500/20 text-yellow-400",
    advanced: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-hero py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {course.is_trending && (
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                  Trending
                </span>
              )}
              {course.has_certificate && (
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                  Certificate
                </span>
              )}
              <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${levelColors[course.level as keyof typeof levelColors]}`}>
                {course.level}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviews_count.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>{course.students_count.toLocaleString()} students</span>
              </div>
              {course.duration_hours && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration_hours} hours</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">ET</span>
              </div>
              <div>
                <div className="font-medium">{course.instructor}</div>
                <div className="text-sm text-muted-foreground">Egreed Technology</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.long_description || course.description}
              </p>
            </div>

            {/* What you'll learn */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-semibold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium">{module.module}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{module.lessons.length} lessons</span>
                        {expandedModules.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                    {expandedModules.includes(index) && (
                      <div className="border-t border-border">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/30 transition-colors"
                          >
                            <Play className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            {course.instructor_bio && (
              <div>
                <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">ET</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{course.instructor}</h3>
                      <p className="text-sm text-muted-foreground">Egreed Technology</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{course.instructor_bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-primary">{course.price.toLocaleString()} FRW</span>
                {course.original_price && (
                  <span className="text-sm text-muted-foreground line-through">{course.original_price.toLocaleString()} FRW</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {course.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
                {course.has_certificate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Certificate of completion</span>
                  </div>
                )}
              </div>

              {isEnrolled ? (
                <Link
                  to={`/learn/${course.slug}`}
                  className="block w-full py-4 bg-accent text-accent-foreground font-semibold rounded-xl text-center hover:opacity-90 transition-opacity"
                >
                  Start Learning
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:glow-primary transition-all duration-300 disabled:opacity-50"
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </button>
              )}

              <p className="text-xs text-center text-muted-foreground mt-4">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Payment Modal */}
      {showPayment && course && user && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <MobilePayment
              courseId={course.id}
              courseTitle={course.title}
              amount={course.price}
              userId={user.id}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPayment(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
