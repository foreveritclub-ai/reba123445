import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Clock, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizRunnerProps {
  title: string;
  questions: QuizQuestion[];
  passingScore?: number; // percent
  timeLimitSeconds?: number;
  onComplete: (result: {
    score: number;
    total: number;
    passed: boolean;
    answers: number[];
    violations: number;
  }) => void;
  onCancel?: () => void;
}

const QuizRunner = ({
  title,
  questions,
  passingScore = 70,
  timeLimitSeconds,
  onComplete,
  onCancel,
}: QuizRunnerProps) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [violations, setViolations] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds ?? 0);

  // Anti-cheat: tab visibility, copy, right-click, devtools shortcuts, text selection
  useEffect(() => {
    if (submitted) return;

    const onVisibility = () => {
      if (document.hidden) {
        setViolations((v) => v + 1);
        toast.warning("Tab switch detected — this is recorded", {
          icon: <AlertTriangle className="w-4 h-4" />,
        });
      }
    };
    const onContext = (e: MouseEvent) => e.preventDefault();
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      setViolations((v) => v + 1);
      toast.error("Copying is disabled during the quiz");
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        (e.ctrlKey && ["c", "u", "p", "s"].includes(k)) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k)) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        setViolations((v) => v + 1);
        toast.error("This shortcut is disabled during the quiz");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("copy", onCopy);
    document.addEventListener("keydown", onKey);
    const prevSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("keydown", onKey);
      document.body.style.userSelect = prevSelect;
    };
  }, [submitted]);

  // Optional countdown timer
  useEffect(() => {
    if (!timeLimitSeconds || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitted]);

  const setAnswer = (idx: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === current ? idx : a)));
  };

  const handleSubmit = () => {
    if (submitted) return;
    const score = answers.reduce(
      (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
      0
    );
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= passingScore;
    setSubmitted(true);
    onComplete({
      score: percent,
      total: questions.length,
      passed,
      answers,
      violations,
    });
  };

  if (questions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center text-muted-foreground">
        No questions available yet.
      </div>
    );
  }

  if (submitted) {
    const score = answers.reduce(
      (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
      0
    );
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-6 space-y-6 select-none"
      >
        <div className="text-center">
          {passed ? (
            <Trophy className="w-12 h-12 mx-auto text-primary mb-3" />
          ) : (
            <XCircle className="w-12 h-12 mx-auto text-destructive mb-3" />
          )}
          <h3 className="text-2xl font-bold">{passed ? "Passed!" : "Not yet"}</h3>
          <p className="text-muted-foreground mt-1">
            Score: <span className="font-semibold text-foreground">{percent}%</span> ({score}/
            {questions.length}) • Required: {passingScore}%
          </p>
          {violations > 0 && (
            <p className="text-xs text-destructive mt-2">
              {violations} anti-cheat violation{violations > 1 ? "s" : ""} recorded
            </p>
          )}
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctIndex;
            return (
              <div key={i} className="border border-border rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  {correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                </div>
                <div className="ml-7 text-sm space-y-1">
                  <p className="text-muted-foreground">
                    Your answer:{" "}
                    <span className={correct ? "text-green-500" : "text-destructive"}>
                      {answers[i] >= 0 ? q.options[answers[i]] : "No answer"}
                    </span>
                  </p>
                  {!correct && (
                    <p className="text-muted-foreground">
                      Correct: <span className="text-green-500">{q.options[q.correctIndex]}</span>
                    </p>
                  )}
                  {q.explanation && (
                    <p className="text-xs text-muted-foreground italic mt-2">{q.explanation}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!passed && onCancel && (
          <div className="flex justify-center">
            <Button onClick={onCancel} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  const q = questions[current];
  const answeredCount = answers.filter((a) => a >= 0).length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Question {current + 1} of {questions.length} • {answeredCount} answered
          </p>
        </div>
        {timeLimitSeconds && (
          <div className="flex items-center gap-2 text-sm font-mono text-primary">
            <Clock className="w-4 h-4" />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        )}
      </div>

      <Progress value={((current + 1) / questions.length) * 100} className="h-1" />

      <div>
        <p className="text-base font-medium mb-4">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setAnswer(i)}
              className={`w-full text-left p-3 rounded-xl border transition-colors ${
                answers[current] === i
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:bg-secondary/50 text-muted-foreground"
              }`}
            >
              <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="ghost"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)} disabled={answers[current] < 0}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={answeredCount < questions.length}>
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizRunner;
