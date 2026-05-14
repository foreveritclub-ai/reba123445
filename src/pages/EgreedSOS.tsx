import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Activity, ShieldAlert, BrainCircuit, Wrench, GraduationCap,
  Cable, Gauge, Rocket, ArrowRight, CheckCircle2, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImg from "@/assets/egreed-sos-hero.jpg";

const SITE = "https://egreedtech.org";
const PAGE_URL = `${SITE}/products/egreed-sos`;
const OG_IMAGE = `${SITE}/og-egreed-sos.jpg`;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const features = [
  { icon: Activity, title: "Smart Diagnostics", desc: "Real-time vehicle fault detection and continuous health monitoring." },
  { icon: ShieldAlert, title: "Emergency SOS", desc: "Instant emergency assistance, crash detection and incident alerts." },
  { icon: BrainCircuit, title: "AI Monitoring", desc: "Intelligent analysis of performance, behavior and system anomalies." },
  { icon: Wrench, title: "Garage Pro Mode", desc: "Advanced toolkit for mechanics, technicians and smart workshops." },
  { icon: GraduationCap, title: "School & Learning", desc: "Educational automotive system for training and certification." },
  { icon: Cable, title: "OBD Integration", desc: "Native support for intelligent OBD-II vehicle systems." },
  { icon: Gauge, title: "Real-Time Tracking", desc: "Live monitoring of engine, battery, sensors and performance." },
  { icon: Rocket, title: "Future Mobility Ready", desc: "Architecture engineered for tomorrow's smart transportation." },
];

const whyPoints = [
  "Built for Africa and global markets",
  "AI-powered automotive platform",
  "Smart diagnostics + emergency in one",
  "Future-ready scalable architecture",
  "User-friendly cockpit experience",
  "Professional garage support",
  "Educational automotive ecosystem",
  "Connected smart mobility platform",
];

const roadmap = [
  { phase: "01", title: "Smart Diagnostics", desc: "Foundation diagnostic engine and OBD pipeline." },
  { phase: "02", title: "AI Fault Prediction", desc: "Predictive models for early failure detection." },
  { phase: "03", title: "Garage Digital Systems", desc: "Workflow tools for mechanics and workshops." },
  { phase: "04", title: "Fleet Integration", desc: "Multi-vehicle dashboards and telemetry." },
  { phase: "05", title: "EV / BMS Support", desc: "Battery management and EV health intelligence." },
  { phase: "06", title: "Smart Transportation", desc: "Connected mobility and city-scale insights." },
  { phase: "07", title: "Autonomous Research", desc: "Foundations for autonomous driving research." },
];

const userTypes = ["Car Owner", "Mechanic", "Garage", "Student", "Fleet Company", "Partner"];

export default function EgreedSOS() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", userType: "Car Owner" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) return toast.error("Name and email are required.");
    setLoading(true);
    const composedName = `${form.name} | ${form.phone || "-"} | ${form.country || "-"} | ${form.userType}`;
    const { error } = await supabase.from("waitlist_signups").insert({
      email: form.email.trim().toLowerCase(),
      name: composedName,
      source: "egreed-sos",
    });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.success("You're already on the list. Stay tuned!");
      else toast.error(error.message);
      return;
    }
    toast.success("Welcome to the future of mobility. You're on the list.");
    setForm({ name: "", email: "", phone: "", country: "", userType: "Car Owner" });
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "EGREED SOS",
    brand: { "@type": "Brand", name: "EGREEDTECH" },
    description: "Intelligent automotive diagnostics, emergency assistance and smart mobility platform.",
    image: OG_IMAGE,
    url: PAGE_URL,
    category: "Automotive AI Platform",
    offers: { "@type": "Offer", availability: "https://schema.org/PreOrder", price: "0", priceCurrency: "USD", url: PAGE_URL },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>EGREED SOS | Smart Automotive Diagnostics & Emergency Platform</title>
        <meta name="description" content="EGREED SOS by EGREEDTECH is an intelligent automotive diagnostics and emergency assistance platform built for smart vehicles, garages, mechanics, and future mobility systems." />
        <meta name="keywords" content="smart automotive diagnostics, automotive AI platform, vehicle monitoring system, emergency vehicle system, smart garage technology, AI car diagnostics, automotive innovation Africa, OBD smart diagnostics, smart mobility platform, intelligent transportation system, Rwanda automotive technology" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content="EGREED SOS — Future Automotive Intelligence" />
        <meta property="og:description" content="Smart diagnostics, AI monitoring, emergency systems, and future mobility technologies." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EGREED SOS — Future Automotive Intelligence" />
        <meta name="twitter:description" content="Smart diagnostics, AI monitoring, emergency systems, and future mobility technologies." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(productLd)}</script>
      </Helmet>

      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="EGREED SOS futuristic automotive AI dashboard" width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(195_100%_50%/0.18),transparent_60%),radial-gradient(circle_at_70%_80%,hsl(220_100%_55%/0.15),transparent_60%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-md text-cyan-300 text-xs font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" /> EGREEDTECH · UPCOMING LAUNCH
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-[1.05]"
          >
            EGREED SOS
          </motion.h1>
          <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="mt-4 text-xl md:text-2xl text-cyan-200/90 font-light">
            Smart Automotive Intelligence
          </motion.p>
          <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            An intelligent vehicle diagnostics, emergency assistance, and smart mobility platform developed for the next generation of transportation.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.35 }} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#waitlist">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-[0_0_40px_-5px_hsl(195_100%_50%/0.6)]">
                Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#waitlist">
              <Button size="lg" variant="outline" className="border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 backdrop-blur-md">
                Get Launch Updates
              </Button>
            </a>
            <a href="#features">
              <Button size="lg" variant="ghost" className="text-cyan-200 hover:bg-white/5">
                Explore Features
              </Button>
            </a>
          </motion.div>
        </div>

        {/* glowing line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      </section>

      {/* OVERVIEW */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-bold mb-6">What is <span className="text-cyan-400">EGREED SOS</span>?</motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg text-muted-foreground leading-relaxed">
            EGREED SOS is a next-generation automotive platform combining smart diagnostics, AI-powered monitoring, emergency support systems, garage tools, and future mobility technologies into one intelligent ecosystem.
          </motion.p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {["Vehicle Owners", "Mechanics", "Smart Garages", "Automotive Students", "Fleet Systems", "Future Mobility"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-cyan-100"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,hsl(195_100%_50%/0.08),transparent_70%)]" />
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-cyan-400">Features</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything a modern vehicle, mechanic and mobility ecosystem needs — unified.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/40 hover:bg-cyan-400/[0.04] transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/10 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold">Why <span className="text-cyan-400">EGREED SOS</span> is Different</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {whyPoints.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 p-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-foreground/90">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,hsl(220_100%_8%/0.4),transparent)]" />
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Building the Future of <span className="text-cyan-400">Automotive Intelligence</span></h2>
            <p className="text-muted-foreground">A roadmap from smart diagnostics to autonomous research support.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
            <div className="space-y-6">
              {roadmap.map((r, i) => (
                <motion.div
                  key={r.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative flex md:items-center gap-6 ${i % 2 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_hsl(195_100%_50%/0.8)]" />
                  <div className="md:w-1/2" />
                  <div className="md:w-1/2 ml-12 md:ml-0 md:px-8">
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                      <div className="text-xs font-mono text-cyan-400 mb-2">PHASE {r.phase}</div>
                      <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Be First to Experience <span className="text-cyan-400">EGREED SOS</span></h2>
            <p className="text-muted-foreground">Join the future of smart mobility and automotive innovation.</p>
          </motion.div>

          <motion.form
            {...fadeUp}
            onSubmit={submit}
            className="p-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-white/[0.04] to-cyan-400/[0.02] backdrop-blur-2xl shadow-[0_0_60px_-20px_hsl(195_100%_50%/0.4)]"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-2 bg-background/50 border-white/10" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 bg-background/50 border-white/10" placeholder="you@email.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-2 bg-background/50 border-white/10" placeholder="+250 ..." />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="mt-2 bg-background/50 border-white/10" placeholder="Rwanda" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="userType">User type</Label>
                <select
                  id="userType"
                  value={form.userType}
                  onChange={e => setForm({ ...form, userType: e.target.value })}
                  className="mt-2 w-full h-10 rounded-md bg-background/50 border border-white/10 px-3 text-sm"
                >
                  {userTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <Button type="submit" disabled={loading} size="lg" className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-[0_0_40px_-5px_hsl(195_100%_50%/0.6)]">
              {loading ? "Joining..." : "Join Early Access"} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">Join the future of smart mobility and automotive innovation.</p>
          </motion.form>
        </div>
      </section>

      {/* ANNOUNCEMENT */}
      <section className="py-24 px-6">
        <motion.div {...fadeUp} className="max-w-4xl mx-auto p-10 md:p-14 rounded-3xl border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,hsl(195_100%_50%/0.08),transparent_60%)] backdrop-blur-xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300 text-xs mb-6">
            <Sparkles className="w-3 h-3" /> OFFICIAL ANNOUNCEMENT
          </div>
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            <strong>EGREEDTECH</strong> proudly announces the upcoming launch of <strong className="text-cyan-300">EGREED SOS</strong> — an intelligent automotive diagnostics and emergency platform designed for modern vehicles, garages, and future mobility systems.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            EGREED SOS combines AI-powered diagnostics, real-time monitoring, smart garage systems, and connected automotive technologies into one intelligent ecosystem.
          </p>
          <p className="mt-6 text-cyan-300 font-medium">The future of automotive intelligence starts here.</p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
