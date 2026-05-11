import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  industry: string | null;
  category: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image_url?: string | null;
  updated_at?: string;
  created_at?: string;
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setStudy(data as unknown as CaseStudy | null);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!study) return <NotFound />;

  const canonicalUrl = `https://egreedtech.org/case-studies/${study.slug}`;
  const description = study.results?.slice(0, 160) || study.challenge?.slice(0, 160) || study.title;
  const absoluteImage = study.image_url
    ? (study.image_url.startsWith("http") ? study.image_url : `https://egreedtech.org${study.image_url}`)
    : "https://egreedtech.org/og-image.jpg";
  const caseLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    additionalType: "https://schema.org/Article",
    name: study.title,
    headline: study.title,
    about: study.category,
    image: {
      "@type": "ImageObject",
      url: absoluteImage,
      caption: `${study.title} — Egreed Technology case study`,
    },
    datePublished: study.created_at,
    dateModified: study.updated_at ?? study.created_at,
    description,
    creator: {
      "@type": "Organization",
      name: "Egreed Technology LTD",
      url: "https://egreedtech.org",
      logo: "https://egreedtech.org/favicon.ico",
    },
    audience: study.client_name ? { "@type": "Audience", name: study.client_name } : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: (study.tags || []).join(", "),
    text: study.results,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://egreedtech.org/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://egreedtech.org/case-studies" },
      { "@type": "ListItem", position: 3, name: study.title, item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{`${study.title} | Egreed Technology Case Study`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={study.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absoluteImage} />
        <meta property="og:image:alt" content={`${study.title} — Egreed Technology case study`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={study.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteImage} />
        <script type="application/ld+json">{JSON.stringify(caseLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="px-6 py-16 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4" /> All Case Studies
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{study.category}</span>
                {study.industry && <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{study.industry}</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{study.title}</h1>
              {study.client_name && <p className="text-muted-foreground">Client: {study.client_name}</p>}
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.metrics.map(m => (
              <div key={m.label} className="text-center p-5 bg-card border border-border/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{m.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
            <p className="text-muted-foreground leading-relaxed">{study.results}</p>
          </section>

          {/* Tags */}
          {study.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {study.tags.map(t => (
                <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{t}</span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="bg-card border border-border/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Want similar results for your business?</h3>
            <p className="text-muted-foreground mb-4">Let's discuss how we can help transform your organization with AI and data analytics.</p>
            <Link to="/#contact" className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity">
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
