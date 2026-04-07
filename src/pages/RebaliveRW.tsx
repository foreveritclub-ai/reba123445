import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, HeartPulse, Stethoscope, Shield, Smartphone, Brain,
  ArrowRight, ExternalLink, Sparkles, Check, Rocket, Mail, Loader2, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import rebaliveHero from "@/assets/rebalive-hero.jpg";

const features = [
  { icon: HeartPulse, title: "Health Tracking", emoji: "❤️", description: "Monitor your vital signs, fitness goals, and wellness metrics with real-time tracking and personalized insights." },
  { icon: Stethoscope, title: "Telemedicine", emoji: "🩺", description: "Connect with certified healthcare professionals from anywhere in Rwanda through video consultations." },
  { icon: Brain, title: "Mental Wellness", emoji: "🧠", description: "Access mental health resources, guided meditation, and stress management tools for holistic wellbeing." },
  { icon: Shield, title: "Secure Health Records", emoji: "🔒", description: "Your health data is encrypted and securely stored, giving you full control over who can access it." },
  { icon: Smartphone, title: "Mobile First", emoji: "📱", description: "Designed for mobile — access all health services from your phone with an intuitive, easy-to-use interface." },
  { icon: Activity, title: "Wellness Programs", emoji: "💪", description: "Join curated wellness programs covering nutrition, exercise, and preventive care tailored for Rwandans." },
];

const stats = [
  { value: "10K+", label: "Active users" },
  { value: "200+", label: "Health professionals" },
  { value: "98%", label: "User satisfaction" },
  { value: "24/7", label: "Care availability" },
];

const RebaliveRW = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist_signups").insert({ email: email.trim(), name: name.trim() || null, source: "rebalive-rw" });
      if (error) {
        if (error.code === "23505") { toast.info("You're already on the waitlist!"); }
        else { throw error; }
      } else {
        toast.success("Welcome to the waitlist! We'll notify you when Rebalive RW launches.");
      }
      setIsJoined(true);
      setEmail("");
      setName("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Rebalive RW - Health & Wellness Platform | Egreed Technology</title>
        <meta name="description" content="Rebalive RW connects Rwandans with healthcare services, wellness resources, and health tracking. Telemedicine, health monitoring, and wellness programs." />
      </Helmet>
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-teal-500/10 py-20 lg:py-28">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <Badge variant="outline" className="mb-4 border-teal-500/50 text-teal-600 dark:text-teal-400">
                  <Rocket className="w-3 h-3 mr-1" /> Coming Soon
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                  Rebalive{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600">
                    RW
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
                  Your Health. Your Hands. Your Future.
                </p>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                  A cutting-edge health and wellness platform designed to connect Rwandans with healthcare services, wellness resources, and health information.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white gap-2">
                    <Rocket className="w-4 h-4" /> Coming Soon
                  </Button>
                  <a href="https://rebalive.egreedtech.org" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="gap-2 border-teal-500/30 hover:bg-teal-500/10">
                      Visit Platform <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                  <img src={rebaliveHero} alt="Rebalive RW Health Platform" width={1280} height={720} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">From telemedicine to wellness programs — everything you need for a healthier life, designed for Rwanda.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:border-teal-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                          <feature.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{feature.emoji} {feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlight */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 opacity-90" />
                <div className="relative z-10 p-8 md:p-14 text-center text-white">
                  <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Healthcare for Every Rwandan</h2>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                    Bridging the gap between Rwandans and quality healthcare through accessible digital health solutions.
                  </p>
                  <ul className="flex flex-wrap justify-center gap-4 mb-8">
                    {["Affordable consultations", "Expert doctors", "Kinyarwanda support", "Data privacy"].map((item) => (
                      <li key={item} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                        <Check className="w-4 h-4" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a href="https://rebalive.egreedtech.org" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="secondary" className="gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RebaliveRW;
