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
  HelpCircle,
  FileText,
  GraduationCap,
  ListChecks,
  Trophy,
  Download,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/VideoPlayer";
import CertificateGenerator from "@/components/CertificateGenerator";
import LearningTour from "@/components/LearningTour";
import QuizRunner, { QuizQuestion } from "@/components/QuizRunner";

interface LessonResource {
  label: string;
  url: string;
}

interface LessonData {
  title: string;
  video_url?: string;
  image_url?: string;
  content?: string;
  resources?: LessonResource[];
  quiz?: QuizQuestion[];
}

interface CourseModule {
  module: string;
  lessons: (string | LessonData)[];
}

interface LessonProgress {
  module_index: number;
  lesson_index: number;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  description: string;
  curriculum: CourseModule[];
  duration_hours: number | null;
  syllabus: string | null;
  final_exam: QuizQuestion[];
  passing_score: number;
}

interface QuizAttempt {
  id: string;
  attempt_type: "lesson_quiz" | "final_exam";
  module_index: number | null;
  lesson_index: number | null;
  score: number;
  passed: boolean;
}

const normalizeLesson = (lesson: string | LessonData): LessonData =>
  typeof lesson === "string" ? { title: lesson } : lesson;

const Learn = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeTab, setActiveTab] = useState<"lesson" | "syllabus" | "exam">("lesson");
  const [isUpdating, setIsUpdating] = useState(false);
  const [tabFocused, setTabFocused] = useState(true);
  const [lessonStartTime, setLessonStartTime] = useState<number>(Date.now());
  const [studentName, setStudentName] = useState("");
  const [showTour, setShowTour] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFinalExam, setShowFinalExam] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("egreed-learning-tour-completed");
    if (!hasSeenTour) setShowTour(true);
  }, []);

  // Anti-cheat: tab visibility
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

  // Anti-cheat: prevent right-click + dev shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I" || e.key === "j" || e.key === "J")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
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
    if (user && slug) fetchCourseAndProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, slug]);

  const fetchCourseAndProgress = async () => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user!.id)
        .maybeSingle();
      setStudentName(profileData?.full_name || "Student");

      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select(
          "id, slug, title, instructor, description, curriculum, duration_hours, syllabus, final_exam, passing_score"
        )
        .eq("slug", slug)
        .maybeSingle();

      if (courseError) throw courseError;
      if (!courseData) {
        navigate("/dashboard");
        return;
      }

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

      const parsedCurriculum: CourseModule[] = Array.isArray(courseData.curriculum)
        ? (courseData.curriculum as unknown as CourseModule[])
        : [];

      const finalExam: QuizQuestion[] = Array.isArray(courseData.final_exam)
        ? (courseData.final_exam as unknown as QuizQuestion[])
        : [];

      setCourse({
        ...courseData,
        curriculum: parsedCurriculum,
        final_exam: finalExam,
        passing_score: courseData.passing_score ?? 70,
      });

      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("module_index, lesson_index")
        .eq("user_id", user!.id)
        .eq("course_id", courseData.id);
      setLessonProgress(progressData || []);

      const { data: attemptsData } = await supabase
        .from("quiz_attempts")
        .select("id, attempt_type, module_index, lesson_index, score, passed")
        .eq("user_id", user!.id)
        .eq("course_id", courseData.id)
        .order("created_at", { ascending: false });
      setAttempts((attemptsData as QuizAttempt[]) || []);
    } catch (error) {
      console.error("Error fetching course:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const isLessonCompleted = useCallback(
    (m: number, l: number) =>
      lessonProgress.some((p) => p.module_index === m && p.lesson_index === l),
    [lessonProgress]
  );

  const totalLessons = course?.curriculum.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0;

  const calculateProgress = useCallback(() => {
    if (totalLessons === 0) return 0;
    return Math.round((lessonProgress.length / totalLessons) * 100);
  }, [lessonProgress, totalLessons]);

  const allLessonsDone = totalLessons > 0 && lessonProgress.length >= totalLessons;
  const finalExamPassed = attempts.some((a) => a.attempt_type === "final_exam" && a.passed);
  const courseFullyCompleted =
    allLessonsDone && (course?.final_exam.length === 0 || finalExamPassed);

  const lessonQuizPassed = useCallback(
    (m: number, l: number) =>
      attempts.some(
        (a) =>
          a.attempt_type === "lesson_quiz" &&
          a.module_index === m &&
          a.lesson_index === l &&
          a.passed
      ),
    [attempts]
  );

  const handleLessonComplete = async () => {
    if (!course || !user || isUpdating) return;

    const lesson = normalizeLesson(course.curriculum[activeModule].lessons[activeLesson]);
    const hasQuiz = (lesson.quiz?.length ?? 0) > 0;

    if (hasQuiz && !lessonQuizPassed(activeModule, activeLesson)) {
      setShowQuiz(true);
      return;
    }

    const timeSpent = (Date.now() - lessonStartTime) / 1000;
    if (timeSpent < 30) {
      toast.error(`Please spend at least ${Math.ceil(30 - timeSpent)} more seconds on this lesson`);
      return;
    }

    if (isLessonCompleted(activeModule, activeLesson)) {
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

      const newProgress = [...lessonProgress, { module_index: activeModule, lesson_index: activeLesson }];
      setLessonProgress(newProgress);

      const newPercent = Math.round((newProgress.length / totalLessons) * 100);
      await supabase
        .from("enrollments")
        .update({
          progress: newPercent,
          completed_at:
            newPercent === 100 && (course.final_exam.length === 0 || finalExamPassed)
              ? new Date().toISOString()
              : null,
        })
        .eq("user_id", user.id)
        .eq("course_id", course.id);

      toast.success("Lesson completed!");
      moveToNextLesson();
    } catch (e) {
      console.error(e);
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

  const selectLesson = (m: number, l: number) => {
    const canAccess =
      isLessonCompleted(m, l) ||
      (m === 0 && l === 0) ||
      isLessonCompleted(
        l === 0 ? m - 1 : m,
        l === 0 ? (course?.curriculum[m - 1]?.lessons.length || 1) - 1 : l - 1
      );
    if (!canAccess) {
      toast.error("Complete previous lessons first");
      return;
    }
    setActiveModule(m);
    setActiveLesson(l);
    setLessonStartTime(Date.now());
    setActiveTab("lesson");
  };

  const handleQuizComplete = async (result: {
    score: number;
    total: number;
    passed: boolean;
    answers: number[];
    violations: number;
  }) => {
    if (!course || !user) return;
    try {
      await supabase.from("quiz_attempts").insert({
        user_id: user.id,
        course_id: course.id,
        attempt_type: "lesson_quiz",
        module_index: activeModule,
        lesson_index: activeLesson,
        score: result.score,
        total_questions: result.total,
        passed: result.passed,
        answers: result.answers,
        violations: result.violations,
      });
      // Refresh attempts
      const { data } = await supabase
        .from("quiz_attempts")
        .select("id, attempt_type, module_index, lesson_index, score, passed")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .order("created_at", { ascending: false });
      setAttempts((data as QuizAttempt[]) || []);

      if (result.passed) {
        toast.success(`Quiz passed with ${result.score}%!`);
        // Auto-mark lesson complete after passing the quiz
        if (!isLessonCompleted(activeModule, activeLesson)) {
          await supabase.from("lesson_progress").insert({
            user_id: user.id,
            course_id: course.id,
            module_index: activeModule,
            lesson_index: activeLesson,
            time_spent_seconds: Math.round((Date.now() - lessonStartTime) / 1000),
          });
          setLessonProgress((prev) => [
            ...prev,
            { module_index: activeModule, lesson_index: activeLesson },
          ]);
        }
      } else {
        toast.error(`Score ${result.score}% — need ${course.passing_score}% to pass`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to record attempt");
    }
  };

  const handleFinalExamComplete = async (result: {
    score: number;
    total: number;
    passed: boolean;
    answers: number[];
    violations: number;
  }) => {
    if (!course || !user) return;
    try {
      await supabase.from("quiz_attempts").insert({
        user_id: user.id,
        course_id: course.id,
        attempt_type: "final_exam",
        module_index: null,
        lesson_index: null,
        score: result.score,
        total_questions: result.total,
        passed: result.passed,
        answers: result.answers,
        violations: result.violations,
      });
      const { data } = await supabase
        .from("quiz_attempts")
        .select("id, attempt_type, module_index, lesson_index, score, passed")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .order("created_at", { ascending: false });
      setAttempts((data as QuizAttempt[]) || []);

      if (result.passed) {
        toast.success("🎉 Final exam passed! Certificate unlocked.");
        await supabase
          .from("enrollments")
          .update({ progress: 100, completed_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("course_id", course.id);
      } else {
        toast.error(`Score ${result.score}% — need ${course.passing_score}% to pass`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to record exam");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) return null;

  const currentLesson = normalizeLesson(course.curriculum[activeModule]?.lessons[activeLesson]);
  const progress = calculateProgress();
  const hasFinalExam = course.final_exam.length > 0;
  const finalExamUnlocked = allLessonsDone;

  return (
    <>
      {showTour && (
        <LearningTour
          onComplete={() => {
            localStorage.setItem("egreed-learning-tour-completed", "true");
            setShowTour(false);
          }}
        />
      )}

      <div className="min-h-screen bg-background flex flex-col select-none">
        {/* Header */}
        <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <h1 className="font-semibold text-sm sm:text-base truncate">{course.title}</h1>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTour(true)}
                className="hidden sm:flex"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Guide
              </Button>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{progress}%</span>
              </div>
              <div className="w-20 sm:w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </header>

        {!tabFocused && (
          <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 text-center text-sm text-destructive">
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Please return to this tab to continue learning
          </div>
        )}

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card overflow-y-auto max-h-[300px] lg:max-h-[calc(100vh-57px)]">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="font-semibold mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                  Course Content
                </h2>
                <div className="space-y-2">
                  {course.curriculum.map((module, mi) => (
                    <div key={mi} className="space-y-1">
                      <div className="text-sm font-medium py-2 px-3 bg-secondary/50 rounded-lg flex items-center justify-between">
                        <span className="truncate">{module.module}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {module.lessons.filter((_, li) => isLessonCompleted(mi, li)).length}/
                          {module.lessons.length}
                        </span>
                      </div>
                      {module.lessons.map((lesson, li) => {
                        const lessonObj = normalizeLesson(lesson);
                        const completed = isLessonCompleted(mi, li);
                        const isActive =
                          activeModule === mi && activeLesson === li && activeTab === "lesson";
                        const canAccess =
                          completed ||
                          (mi === 0 && li === 0) ||
                          isLessonCompleted(
                            li === 0 ? mi - 1 : mi,
                            li === 0
                              ? (course.curriculum[mi - 1]?.lessons.length || 1) - 1
                              : li - 1
                          );
                        return (
                          <button
                            key={li}
                            onClick={() => selectLesson(mi, li)}
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
                            <span className="truncate flex-1">{lessonObj.title}</span>
                            {(lessonObj.quiz?.length ?? 0) > 0 && (
                              <ListChecks className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus & Exam buttons */}
              <div className="pt-3 border-t border-border space-y-1">
                <button
                  onClick={() => setActiveTab("syllabus")}
                  className={`w-full flex items-center gap-3 py-2 px-3 text-sm rounded-lg text-left transition-colors ${
                    activeTab === "syllabus"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Syllabus</span>
                </button>
                {hasFinalExam && (
                  <button
                    onClick={() => setActiveTab("exam")}
                    disabled={!finalExamUnlocked}
                    className={`w-full flex items-center gap-3 py-2 px-3 text-sm rounded-lg text-left transition-colors ${
                      activeTab === "exam"
                        ? "bg-primary/10 text-primary"
                        : finalExamUnlocked
                        ? "hover:bg-secondary/50"
                        : "opacity-50 cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    {finalExamUnlocked ? (
                      <GraduationCap className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    <span>Final Exam</span>
                    {finalExamPassed && (
                      <Trophy className="w-3.5 h-3.5 text-primary ml-auto" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              {/* Certificate (only after exam passed if exam exists) */}
              {courseFullyCompleted && (
                <div className="mb-8">
                  <CertificateGenerator
                    courseId={course.id}
                    courseTitle={course.title}
                    studentName={studentName}
                    userId={user!.id}
                  />
                </div>
              )}

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="mb-6">
                  <TabsTrigger value="lesson">Lesson</TabsTrigger>
                  <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                  {hasFinalExam && (
                    <TabsTrigger value="exam" disabled={!finalExamUnlocked}>
                      Final Exam
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* LESSON TAB */}
                <TabsContent value="lesson">
                  <motion.div
                    key={`${activeModule}-${activeLesson}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6">
                      <span className="text-sm text-muted-foreground">
                        Module {activeModule + 1}, Lesson {activeLesson + 1}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold mt-1">
                        {currentLesson.title}
                      </h2>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 space-y-6">
                      {/* Video */}
                      {currentLesson.video_url ? (
                        <VideoPlayer
                          videoUrl={currentLesson.video_url}
                          title={currentLesson.title}
                        />
                      ) : null}

                      {/* Image */}
                      {currentLesson.image_url && (
                        <img
                          src={currentLesson.image_url}
                          alt={currentLesson.title}
                          className="w-full rounded-xl border border-border"
                          loading="lazy"
                        />
                      )}

                      {/* Written content */}
                      {currentLesson.content ? (
                        <article className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-foreground/90">
                          {currentLesson.content}
                        </article>
                      ) : (
                        <div className="prose prose-invert max-w-none">
                          <h3>Lesson Overview</h3>
                          <p className="text-muted-foreground">
                            This lesson covers <strong>{currentLesson.title}</strong>. Watch the
                            video and review the key concepts. Your instructor will add detailed
                            notes here soon.
                          </p>
                        </div>
                      )}

                      {/* Resources */}
                      {currentLesson.resources && currentLesson.resources.length > 0 && (
                        <div className="border-t border-border pt-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Lesson Resources
                          </h4>
                          <ul className="space-y-2">
                            {currentLesson.resources.map((r, i) => (
                              <li key={i}>
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  {r.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Quiz status */}
                      {(currentLesson.quiz?.length ?? 0) > 0 && (
                        <div className="border-t border-border pt-6">
                          <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                              <ListChecks className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">Lesson Quiz</p>
                                <p className="text-xs text-muted-foreground">
                                  {currentLesson.quiz!.length} questions • Pass with{" "}
                                  {course.passing_score}%
                                </p>
                              </div>
                            </div>
                            <Button onClick={() => setShowQuiz((s) => !s)} variant="outline">
                              {showQuiz
                                ? "Hide Quiz"
                                : lessonQuizPassed(activeModule, activeLesson)
                                ? "Retake Quiz"
                                : "Start Quiz"}
                            </Button>
                          </div>

                          {showQuiz && (
                            <div className="mt-4">
                              <QuizRunner
                                key={`quiz-${activeModule}-${activeLesson}-${attempts.length}`}
                                title={`${currentLesson.title} — Quiz`}
                                questions={currentLesson.quiz!}
                                passingScore={course.passing_score}
                                onComplete={handleQuizComplete}
                                onCancel={() => setShowQuiz(false)}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="bg-primary/10 rounded-lg border border-primary/20 p-4 flex gap-2">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground m-0">
                          Spend at least 30 seconds on each lesson before marking complete. If
                          this lesson has a quiz, you must pass it to advance.
                        </p>
                      </div>
                    </div>

                    {/* Complete button */}
                    {!courseFullyCompleted && (
                      <div className="flex justify-end">
                        <button
                          onClick={handleLessonComplete}
                          disabled={isUpdating}
                          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          {isUpdating
                            ? "Saving..."
                            : (currentLesson.quiz?.length ?? 0) > 0 &&
                              !lessonQuizPassed(activeModule, activeLesson)
                            ? "Take Quiz to Continue"
                            : isLessonCompleted(activeModule, activeLesson)
                            ? "Continue to Next Lesson"
                            : "Mark Complete & Continue"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                {/* SYLLABUS TAB */}
                <TabsContent value="syllabus">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">Course Syllabus</h2>
                      <p className="text-muted-foreground">{course.description}</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                      {course.syllabus ? (
                        <article className="prose prose-invert max-w-none whitespace-pre-wrap text-foreground/90">
                          {course.syllabus}
                        </article>
                      ) : (
                        <p className="text-muted-foreground">
                          The instructor hasn't added a written syllabus yet. See the modules
                          below for what you'll cover.
                        </p>
                      )}

                      <div className="mt-8">
                        <h3 className="font-semibold mb-4">Modules</h3>
                        <ol className="space-y-3 list-decimal list-inside text-sm">
                          {course.curriculum.map((m, i) => (
                            <li key={i}>
                              <span className="font-medium">{m.module}</span>
                              <span className="text-muted-foreground">
                                {" "}
                                — {m.lessons.length} lessons
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {course.duration_hours && (
                        <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Estimated duration: {course.duration_hours} hours
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* FINAL EXAM TAB */}
                {hasFinalExam && (
                  <TabsContent value="exam">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                          <GraduationCap className="w-7 h-7 text-primary" />
                          Final Exam
                        </h2>
                        <p className="text-muted-foreground">
                          Pass the final exam with at least {course.passing_score}% to earn your
                          certificate.
                        </p>
                      </div>

                      {!finalExamUnlocked ? (
                        <div className="bg-card border border-border rounded-2xl p-6 text-center">
                          <Lock className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                          <p className="font-medium">Complete all lessons to unlock the exam</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {lessonProgress.length}/{totalLessons} lessons completed
                          </p>
                        </div>
                      ) : finalExamPassed && !showFinalExam ? (
                        <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-3">
                          <Trophy className="w-12 h-12 mx-auto text-primary" />
                          <p className="font-semibold text-lg">Exam Passed!</p>
                          <p className="text-sm text-muted-foreground">
                            Your certificate is available above.
                          </p>
                          <Button variant="outline" onClick={() => setShowFinalExam(true)}>
                            Retake Exam
                          </Button>
                        </div>
                      ) : (
                        <>
                          {!showFinalExam ? (
                            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                              <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• {course.final_exam.length} questions</li>
                                <li>• Passing score: {course.passing_score}%</li>
                                <li>
                                  • Anti-cheat is enforced: tab switches, copy and shortcuts are
                                  blocked and recorded
                                </li>
                                <li>• You can retake the exam if you don't pass</li>
                              </ul>
                              <Button onClick={() => setShowFinalExam(true)} className="w-full">
                                Start Final Exam
                              </Button>
                            </div>
                          ) : (
                            <QuizRunner
                              key={`final-${attempts.length}`}
                              title="Final Exam"
                              questions={course.final_exam}
                              passingScore={course.passing_score}
                              timeLimitSeconds={Math.max(60, course.final_exam.length * 60)}
                              onComplete={(r) => {
                                handleFinalExamComplete(r);
                              }}
                              onCancel={() => setShowFinalExam(false)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Learn;
