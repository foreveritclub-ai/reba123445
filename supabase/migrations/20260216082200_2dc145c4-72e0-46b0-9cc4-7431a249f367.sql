
-- Case Studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT,
  industry TEXT,
  category TEXT NOT NULL DEFAULT 'AI & Machine Learning',
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}'::text[],
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case studies are publicly readable"
ON public.case_studies FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage case studies"
ON public.case_studies FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Service Inquiries table (public form submissions)
CREATE TABLE public.service_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_slug TEXT NOT NULL,
  service_name TEXT NOT NULL,
  message TEXT,
  user_id UUID,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit service inquiry"
ON public.service_inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own inquiries"
ON public.service_inquiries FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all inquiries"
ON public.service_inquiries FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
