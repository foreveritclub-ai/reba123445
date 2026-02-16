import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  industry: string | null;
  category: string;
  challenge: string;
  results: string;
  metrics: { label: string; value: string }[];
  image_url: string | null;
  tags: string[];
}

const CaseStudies = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchStudies = async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("id, title, slug, client_name, industry, category, challenge, results, metrics, image_url, tags")
        .eq("is_published", true)
        .order("display_order");
      setStudies((data as unknown as CaseStudy[]) || []);
      setLoading(false);
    };
    fetchStudies();
  }, []);

  const categories = ["All", ...new Set(studies.map(s => s.category))];
  const filtered = filter === "All" ? studies : studies.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 bg-card/30">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Case <span className="text-primary">Studies</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover how we've helped organizations across Rwanda leverage AI and data analytics to solve real-world challenges and drive measurable results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading case studies...</div>
          ) : (
            <div className="space-y-8">
              {filtered.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="block bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{study.category}</span>
                      {study.industry && <span className="text-xs text-muted-foreground">{study.industry}</span>}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{study.title}</h2>
                    {study.client_name && <p className="text-sm text-muted-foreground mb-4">Client: {study.client_name}</p>}
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{study.results}</p>
                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {study.metrics.slice(0, 4).map(m => (
                        <div key={m.label} className="text-center p-3 bg-background rounded-lg">
                          <div className="text-lg font-bold text-primary">{m.value}</div>
                          <div className="text-xs text-muted-foreground">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                      Read Full Case Study <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
