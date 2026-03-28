
CREATE TABLE public.discount_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  is_active boolean NOT NULL DEFAULT true,
  discount_percentage integer NOT NULL DEFAULT 20,
  promo_code text NOT NULL DEFAULT 'EGREED20',
  title text NOT NULL DEFAULT '20% OFF',
  subtitle text NOT NULL DEFAULT 'All Services & Courses',
  description text NOT NULL DEFAULT 'Transform your business with our premium IT solutions at an unbeatable price.',
  expiry_hours integer NOT NULL DEFAULT 24,
  delay_seconds integer NOT NULL DEFAULT 4,
  cta_text text NOT NULL DEFAULT 'Claim Your 20% Discount',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.discount_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Discount config is publicly readable" ON public.discount_config
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage discount config" ON public.discount_config
  FOR ALL TO public USING (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.discount_config (discount_percentage, promo_code, title, subtitle, description, expiry_hours, delay_seconds, cta_text)
VALUES (20, 'EGREED20', '20% OFF', 'All Services & Courses', 'Transform your business with our premium IT solutions at an unbeatable price.', 24, 4, 'Claim Your 20% Discount');
