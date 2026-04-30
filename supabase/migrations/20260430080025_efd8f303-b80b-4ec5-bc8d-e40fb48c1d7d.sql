-- Extend courses with syllabus + final exam
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS syllabus TEXT,
  ADD COLUMN IF NOT EXISTS final_exam JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS passing_score INTEGER NOT NULL DEFAULT 70;

-- Quiz / exam attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  attempt_type TEXT NOT NULL CHECK (attempt_type IN ('lesson_quiz', 'final_exam')),
  module_index INTEGER,
  lesson_index INTEGER,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT false,
  answers JSONB DEFAULT '[]'::jsonb,
  violations INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own attempts"
  ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attempts"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts"
  ON public.quiz_attempts FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_course
  ON public.quiz_attempts(user_id, course_id);
