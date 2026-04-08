
-- Create internship applications table
CREATE TABLE public.internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT NOT NULL,
  education_level TEXT NOT NULL CHECK (education_level IN ('TVET', 'University')),
  course_program TEXT NOT NULL,
  current_level TEXT NOT NULL,
  institution TEXT NOT NULL,
  preferred_shift TEXT NOT NULL CHECK (preferred_shift IN ('Morning', 'Afternoon', 'Evening', 'Flexible')),
  cv_url TEXT,
  portfolio_link TEXT,
  motivation_statement TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit internship application"
  ON public.internship_applications FOR INSERT
  WITH CHECK (true);

-- Admins can do everything
CREATE POLICY "Admins can manage internship applications"
  ON public.internship_applications FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Users can view their own
CREATE POLICY "Users can view own applications"
  ON public.internship_applications FOR SELECT
  USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE TRIGGER update_internship_applications_updated_at
  BEFORE UPDATE ON public.internship_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public) VALUES ('internship-cvs', 'internship-cvs', true);

-- Storage policies
CREATE POLICY "Anyone can upload CVs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'internship-cvs');

CREATE POLICY "Anyone can view CVs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'internship-cvs');
