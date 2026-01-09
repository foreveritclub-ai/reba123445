import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import VideoPlayer from "@/components/VideoPlayer";
import CertificateGenerator from "@/components/CertificateGenerator";

interface LessonData {
  title: string;
  video_url?: string;
}

interface CourseModule {
  module: string;
  lessons: (string | LessonData)[];
}

interface LessonProgress {
  module_index: number;
  lesson_index: number;
}

interface Profile {
  full_name: string | null;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  curriculum: CourseModule[];
  duration_hours: number | null;
}

const Learn = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [tabFocused, setTabFocused] = useState(true);
  const [lessonStartTime, setLessonStartTime] = useState<number>(Date.now());
  const [studentName, setStudentName] = useState("");

  // Anti-cheat: Track tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabFocused(false);
        toast.warning("Please stay on this tab while learning", {
          icon: <AlertTriangle className="w-4 h-4" />,
        });
      } else {
        setTabFocused(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Anti-cheat: Prevent right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.info("Right-click is disabled during lessons");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.key === "c") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.shiftKey && e.key === "i") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        toast.info("This action is disabled during lessons");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
      return;
    }

    if (user && slug) {
      fetchCourseAndProgress();
    }
  }, [user, authLoading, slug, navigate]);

  const fetchCourseAndProgress = async () => {
    try {
      // Fetch profile for student name
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user!.id)
        .maybeSingle();

      setStudentName(profileData?.full_name || "Student");

      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("id, slug, title, instructor, curriculum, duration_hours")
        .eq("slug", slug)
        .maybeSingle();

      if (courseError) throw courseError;
      if (!courseData) {
        navigate("/dashboard");
        return;
      }

      // Check enrollment
      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user!.id)
        .eq("course_id", courseData.id)
        .maybeSingle();

      if (!enrollment) {
        toast.error("You must be enrolled to access this course");
        navigate(`/courses/${slug}`);
        return;
      }

      let parsedCurriculum: CourseModule[] = [];
      if (courseData.curriculum && Array.isArray(courseData.curriculum)) {
        parsedCurriculum = courseData.curriculum as unknown as CourseModule[];
      }

      setCourse({ ...courseData, curriculum: parsedCurriculum });

      // Fetch lesson progress
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("module_index, lesson_index")
        .eq("user_id", user!.id)
        .eq("course_id", courseData.id);

      setLessonProgress(progressData || []);
    } catch (error) {
      console.error("Error fetching course:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getLessonTitle = (lesson: string | LessonData): string => {
    return typeof lesson === "string" ? lesson : lesson.title;
  };

  const getLessonVideoUrl = (lesson: string | LessonData): string => {
    return typeof lesson === "string" ? "" : lesson.video_url || "";
  };

  const isLessonCompleted = useCallback(
    (moduleIndex: number, lessonIndex: number) => {
      return lessonProgress.some(
        (p) => p.module_index === moduleIndex && p.lesson_index === lessonIndex
      );
    },
    [lessonProgress]
  );

  const calculateProgress = useCallback(() => {
    if (!course) return 0;
    const totalLessons = course.curriculum.reduce(
      (acc, mod) => acc + mod.lessons.length,
      0
    );
    if (totalLessons === 0) return 0;
    return Math.round((lessonProgress.length / totalLessons) * 100);
  }, [course, lessonProgress]);

  const isCourseCompleted = useCallback(() => {
    return calculateProgress() === 100;
  }, [calculateProgress]);

  const handleLessonComplete = async () => {
    if (!course || !user || isUpdating) return;

    const timeSpent = (Date.now() - lessonStartTime) / 1000;
    if (timeSpent < 30) {
      toast.error(`Please spend at least ${Math.ceil(30 - timeSpent)} more seconds on this lesson`);
      return;
    }

    const alreadyCompleted = isLessonCompleted(activeModule, activeLesson);
    if (alreadyCompleted) {
      moveToNextLesson();
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase.from("lesson_progress").insert({
        user_id: user.id,
        course_id: course.id,
        module_index: activeModule,
        lesson_index: activeLesson,
        time_spent_seconds: Math.round(timeSpent),
      });

      if (error) throw error;

      const newLessonProgress = [
        ...lessonProgress,
        { module_index: activeModule, lesson_index: activeLesson },
      ];
      setLessonProgress(newLessonProgress);

      // Calculate new progress
      const totalLessons = course.curriculum.reduce(
        (acc, mod) => acc + mod.lessons.length,
        0
      );
      const newProgress = Math.round((newLessonProgress.length / totalLessons) * 100);

      await supabase
        .from("enrollments")
        .update({ 
          progress: newProgress,
          completed_at: newProgress === 100 ? new Date().toISOString() : null
        })
        .eq("user_id", user.id)
        .eq("course_id", course.id);

      toast.success("Lesson completed!");
      
      if (newProgress === 100) {
        toast.success("🎉 Congratulations! You've completed this course!");
      } else {
        moveToNextLesson();
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsUpdating(false);
    }
  };

  const moveToNextLesson = () => {
    if (!course) return;

    const currentModule = course.curriculum[activeModule];
    if (activeLesson < currentModule.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    } else if (activeModule < course.curriculum.length - 1) {
      setActiveModule(activeModule + 1);
      setActiveLesson(0);
    }
    setLessonStartTime(Date.now());
  };

  const selectLesson = (moduleIndex: number, lessonIndex: number) => {
    const canAccess =
      isLessonCompleted(moduleIndex, lessonIndex) ||
      (moduleIndex === 0 && lessonIndex === 0) ||
      isLessonCompleted(
        lessonIndex === 0 ? moduleIndex - 1 : moduleIndex,
        lessonIndex === 0
          ? (course?.curriculum[moduleIndex - 1]?.lessons.length || 1) - 1
          : lessonIndex - 1
      );

    if (!canAccess) {
      toast.error("Complete previous lessons first");
      return;
    }

    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
    setLessonStartTime(Date.now());
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) return null;

  const currentLessonData = course.curriculum[activeModule]?.lessons[activeLesson];
  const currentLessonTitle = getLessonTitle(currentLessonData);
  const currentVideoUrl = getLessonVideoUrl(currentLessonData);
  const progress = calculateProgress();
  const courseCompleted = isCourseCompleted();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
              {course.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{progress}% Complete</span>
            </div>
            <div className="w-24 sm:w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Anti-cheat warning */}
      {!tabFocused && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 text-center text-sm text-destructive">
          <AlertTriangle className="w-4 h-4 inline mr-2" />
          Please return to this tab to continue learning
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar - Curriculum */}
        <aside className="lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card overflow-y-auto max-h-[300px] lg:max-h-[calc(100vh-57px)]">
          <div className="p-4">
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
              Course Content
            </h2>
            <div className="space-y-2">
              {course.curriculum.map((module, moduleIndex) => (
                <div key={moduleIndex} className="space-y-1">
                  <div className="text-sm font-medium py-2 px-3 bg-secondary/50 rounded-lg">
                    {module.module}
                  </div>
                  {module.lessons.map((lesson, lessonIndex) => {
                    const lessonTitle = getLessonTitle(lesson);
                    const completed = isLessonCompleted(moduleIndex, lessonIndex);
                    const isActive =
                      activeModule === moduleIndex && activeLesson === lessonIndex;
                    const canAccess =
                      completed ||
                      (moduleIndex === 0 && lessonIndex === 0) ||
                      isLessonCompleted(
                        lessonIndex === 0 ? moduleIndex - 1 : moduleIndex,
                        lessonIndex === 0
                          ? (course.curriculum[moduleIndex - 1]?.lessons.length || 1) - 1
                          : lessonIndex - 1
                      );

                    return (
                      <button
                        key={lessonIndex}
                        onClick={() => selectLesson(moduleIndex, lessonIndex)}
                        disabled={!canAccess}
                        className={`w-full flex items-center gap-3 py-2 px-3 text-sm rounded-lg transition-colors text-left ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : canAccess
                            ? "hover:bg-secondary/50 text-foreground"
                            : "opacity-50 cursor-not-allowed text-muted-foreground"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : canAccess ? (
                          <Circle className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span className="truncate">{lessonTitle}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <motion.div
            key={`${activeModule}-${activeLesson}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {/* Certificate section if course completed */}
            {courseCompleted && (
              <div className="mb-8">
                <CertificateGenerator
                  courseId={course.id}
                  courseTitle={course.title}
                  studentName={studentName}
                  userId={user!.id}
                />
              </div>
            )}

            <div className="mb-6">
              <span className="text-sm text-muted-foreground">
                Module {activeModule + 1}, Lesson {activeLesson + 1}
              </span>
              <h2 className="text-2xl font-bold mt-1">{currentLessonTitle}</h2>
            </div>

            {/* Lesson Content */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              {/* Video Player */}
              <div className="mb-6">
                <VideoPlayer videoUrl={currentVideoUrl} title={currentLessonTitle} />
              </div>

              <div className="prose prose-invert max-w-none">
                <h3>Lesson Overview</h3>
                <p className="text-muted-foreground">
                  This lesson covers {currentLessonTitle}. Follow along with the video and complete
                  the exercises to reinforce your understanding.
                </p>

                <h4>Key Takeaways</h4>
                <ul className="text-muted-foreground">
                  <li>Understanding core concepts of {currentLessonTitle}</li>
                  <li>Practical applications and real-world examples</li>
                  <li>Best practices and common patterns</li>
                  <li>Hands-on exercises to solidify your knowledge</li>
                </ul>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Study Tip</span>
                  </div>
                  <p className="text-sm text-muted-foreground m-0">
                    Take your time with this lesson. Make sure you understand the concepts
                    before marking it as complete. You'll need to spend at least 30 seconds
                    on each lesson.
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Button */}
            {!courseCompleted && (
              <div className="flex justify-end">
                <button
                  onClick={handleLessonComplete}
                  disabled={isUpdating}
                  className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:glow-primary transition-all disabled:opacity-50"
                >
                  {isUpdating
                    ? "Saving..."
                    : isLessonCompleted(activeModule, activeLesson)
                    ? "Continue to Next Lesson"
                    : "Mark as Complete & Continue"}
                </button>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Learn;