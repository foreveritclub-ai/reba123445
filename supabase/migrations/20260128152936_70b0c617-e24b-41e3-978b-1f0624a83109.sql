-- Create app_role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Egreed Technology Team',
    image_url TEXT,
    read_time TEXT DEFAULT '5 min read',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are publicly readable"
ON public.blog_posts FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create partners table
CREATE TABLE public.partners (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners are publicly readable"
ON public.partners FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage partners"
ON public.partners FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
ON public.products FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create completed_projects table
CREATE TABLE public.completed_projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    image_url TEXT,
    client_name TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.completed_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
ON public.completed_projects FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage projects"
ON public.completed_projects FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create testimonials_managed table (separate from static ones)
CREATE TABLE public.testimonials_managed (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials_managed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are publicly readable"
ON public.testimonials_managed FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials_managed FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS policy for contact_submissions to allow admins to view
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));