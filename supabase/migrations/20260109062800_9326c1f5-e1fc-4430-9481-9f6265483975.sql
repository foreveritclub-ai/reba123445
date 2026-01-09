-- Create lesson_progress table for tracking individual lesson completions
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_index INTEGER NOT NULL,
  lesson_index INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id, module_index, lesson_index)
);

-- Enable RLS
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own lesson progress"
ON public.lesson_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress"
ON public.lesson_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress"
ON public.lesson_progress
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lesson progress"
ON public.lesson_progress
FOR DELETE
USING (auth.uid() = user_id);