
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'kero-iwawe-assist',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_waitlist_email ON public.waitlist_signups (email);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
ON public.waitlist_signups
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view waitlist"
ON public.waitlist_signups
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
