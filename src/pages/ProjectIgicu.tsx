import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Satellite, Cpu, BrainCircuit, Droplets, Leaf, TrendingUp, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SITE = "https://egreedtech.org";

const stack = [
  { icon: Satellite, title: "Orbital Integration", body: "Satellite telemetry monitoring large-scale vegetation indices and climate patterns across the Rwandan landscape." },
  { icon: Cpu, title: "Ground-Truth Sensors", body: "Custom ESP32-based hardware arrays measuring volumetric water content, soil temperature, and NPK levels with 99.9% precision." },
  { icon: BrainCircuit, title: "AI Analytics", body: "Proprietary backend processing raw environmental data into actionable Yield-Forecasts for precise irrigation and fertilizer application." },
];

const impact = [
  { icon: Leaf, title: "Food Security", body: "Minimizing crop failure through early-warning drought detection." },
  { icon: Droplets, title: "Resource Efficiency", body: "Reducing water waste up to 40% via precision smart-irrigation triggers." },
  { icon: TrendingUp, title: "Economic Scalability", body: "Transforming small-holder farms into data-driven enterprises that attract green investment." },
];

const telemetry = [
  { label: "Soil Moisture", value: "62%", trend: "+4%" },
  { label: "Soil Temp", value: "24.1°C", trend: "stable" },
  { label: "NPK Index", value: "8.4 / 10", trend: "+0.2" },
  { label: "Yield Forecast", value: "+18%", trend: "↑" },
];

const ProjectIgicu = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Project IGICU — Soil Intelligence Grid | Egreed Technology</title>
        <meta name="description" content="Project IGICU by Egreed Technology: bridging satellite data and IoT ground sensors to digitize Rwanda's agricultural foundation. GLOC 2026 ready." />
        <link rel="canonical" href={`${SITE}/products/igicu`} />
        <meta property="og:title" content="Project IGICU — Soil Intelligence Grid" />
        <meta property="og:description" content="Bridging space technology and Earth's fertility. Satellite + IoT + AI for Rwanda's agricultural transformation." />
        <meta property="og:url" content={`${SITE}/products/igicu`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Project IGICU",
            brand: { "@type": "Organization", name: "Egreed Technology LTD" },
            description: "Soil Intelligence Grid combining satellite orbital data with ESP32-based IoT sensors and AI yield forecasting.",
            url: `${SITE}/products/igicu`,
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/30">
            <Satellite className="w-3 h-3 mr-1" /> SpaceYield Rwanda · GLOC 2026
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-gradient">Project IGICU</span>
            <br />
            <span className="text-foreground">The Soil Intelligence Grid</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Bridging Space Technology and Earth's Fertility.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            Empowering Rwanda's Agricultural Transformation through Satellite Data and Real-Time IoT Intelligence.
          </p>

          {/* Live Telemetry Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-6"
          >
            {telemetry.map((t) => (
              <div key={t.label} className="text-left p-4 rounded-xl bg-background/40 border border-border/40">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  <Activity className="w-3 h-3 text-primary" /> {t.label}
                </div>
                <div className="text-2xl font-bold text-foreground">{t.value}</div>
                <div className="text-xs text-primary mt-1">{t.trend}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Vision</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Project IGICU (developed by Egreed Technology for the SpaceYield Rwanda initiative) is not just a sensor;
            it is a comprehensive Soil Intelligence Grid. By integrating low-latency IoT ground sensors with satellite
            orbital data, we provide farmers and policy-makers with a "God's-eye view" of land health.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stack.map((s) => (
              <div key={s.title} className="p-8 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/40 transition-colors">
                <s.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">National Impact (Vision 2050)</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            As we head toward the GLOC 2026 challenge, Project IGICU is positioned to solve three critical pillars of Rwanda's growth.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {impact.map((i) => (
              <div key={i.title} className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                <i.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{i.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground italic leading-relaxed">
            "We aren't just monitoring soil; we are digitizing the foundation of our economy."
          </blockquote>
          <p className="mt-6 text-muted-foreground">— BAYISHIME Shema Brayan, Lead Developer</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-card/60 backdrop-blur-md border border-primary/30 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner with Project IGICU</h2>
          <p className="text-muted-foreground mb-8">
            Investors, agricultural cooperatives, and policy-makers — let's digitize Rwanda's soil together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button size="lg">Contact the Team <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
            <Link to="/case-studies">
              <Button size="lg" variant="outline">View Related Case Studies</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectIgicu;
