import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Lightbulb, BookOpen, Newspaper, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const SITE = "https://egreedtech.org";

const tracks = [
  { icon: Newspaper, title: "Blog & Articles", body: "Long-form posts on technology, education, and African industry.", to: "/blog" },
  { icon: BookOpen, title: "Case Studies", body: "Real client stories and engineering deep-dives from Egreed Technology.", to: "/case-studies" },
  { icon: Lightbulb, title: "Tech-Tips by Core", body: "Curated tips on Lovable, AI-driven development, IoT, and design.", to: "/blog?category=tech-tips" },
];

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Insights — Tech-Tips, Blog & Case Studies | Egreed Technology</title>
        <meta name="description" content="Insights from Egreed Technology: Tech-Tips, articles, and case studies covering full-stack development, IoT, AI, and digital strategy across Africa." />
        <link rel="canonical" href={`${SITE}/insights`} />
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center bg-gradient-hero">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Insights</span> from Egreed Technology
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Engineering knowledge, industry analysis, and Tech-Tips from the team building African industry's future.
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {tracks.map((t) => (
            <Link key={t.title} to={t.to} className="group p-8 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/40 transition-all">
              <t.icon className="w-10 h-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">{t.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t.body}</p>
              <span className="inline-flex items-center text-primary text-sm font-medium">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <Link to="/blog"><Button size="lg">Read the latest Tech-Tips</Button></Link>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
