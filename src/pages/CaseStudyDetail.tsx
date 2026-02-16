import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
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
