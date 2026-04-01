import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, Sprout, ShieldCheck, Smartphone, Globe, Cloud, 
  ArrowRight, ExternalLink, Rocket, Sparkles, Check,
  ChevronRight, Mail, Loader2, Users
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
import keroHero from "@/assets/kero-hero.png";
import keroAgriculture from "@/assets/kero-agriculture.png";
import keroAiIllustration from "@/assets/kero-ai-illustration.jpg";

const features = [
  { icon: Bot, title: "Smart AI Assistant", emoji: "🤖", description: "Intelligent conversational AI that understands context and provides actionable insights for everyday tasks." },
  { icon: Sprout, title: "Agriculture Support", emoji: "🌱", description: "Detect crop diseases in seconds, get treatment recommendations, and optimize yields with AI-powered analysis." },
  { icon: ShieldCheck, title: "Security Monitoring", emoji: "🔐", description: "AI-enhanced security monitoring for homes and businesses with real-time alerts and smart detection." },
  { icon: Smartphone, title: "Mobile Friendly", emoji: "📱", description: "Optimized for mobile devices — access powerful AI tools from your phone, anywhere in Rwanda." },
  { icon: Globe, title: "Local Language Support", emoji: "🌍", description: "Built with Kinyarwanda and local context in mind, making AI accessible to every Rwandan." },
  { icon: Cloud, title: "Cloud Sync", emoji: "☁️", description: "Your data syncs seamlessly across devices with secure cloud infrastructure." },
];

const stats = [
  { value: "40%", label: "Crop loss prevention" },
  { value: "2.5M", label: "RWF saved per hectare" },
  { value: "< 5s", label: "Disease detection time" },
  { value: "24/7", label: "AI availability" },
];

const KeroIwaweAssist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({ email: email.trim(), name: name.trim() || null });
      
      if (error) {
        if (error.code === "23505") {
          toast.info("You're already on the waitlist! We'll notify you soon.");
        } else {
          throw error;
        }
      } else {
        toast.success("Welcome to the waitlist! We'll notify you when KERO IWAWE ASSIST launches.");
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
        <title>KERO IWAWE ASSIST - Smart AI for Real-Life Solutions | Egreed Technology</title>
        <meta name="description" content="KERO IWAWE Assist is an intelligent AI assistant for agriculture, security, and everyday tasks. Detect crop diseases, monitor security, and more." />
      </Helmet>
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10 py-20 lg:py-28">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Badge variant="outline" className="mb-4 border-green-500/50 text-green-600 dark:text-green-400">
                  <Rocket className="w-3 h-3 mr-1" /> Coming Soon
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                  KERO IWAWE{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-primary">
                    ASSIST
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
                  Smart AI for Real-Life Solutions
                </p>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                  KERO IWAWE Assist is an intelligent assistant designed to support agriculture, security, and everyday tasks using AI-powered technology.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-primary hover:from-green-700 hover:to-primary/90 text-white gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 border-green-500/30 hover:bg-green-500/10">
                    <Rocket className="w-4 h-4" /> Coming Soon
                  </Button>
                  <a href="https://egreedtech.org" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="ghost" className="gap-2">
                      Visit egreedtech.org <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                  <img
                    src={keroHero}
                    alt="KERO IWAWE ASSIST - AI-powered smart assistant"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-primary">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with cutting-edge AI to solve real problems for Rwandan farmers, businesses, and communities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:border-green-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                          <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {feature.emoji} {feature.title}
                          </h3>
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

        {/* AI Dashboard Illustration */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src={keroAiIllustration}
                  alt="KERO IWAWE ASSIST AI Dashboard"
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="rounded-2xl shadow-xl border border-border/50"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  AI-Powered Dashboard
                </h2>
                <p className="text-muted-foreground mb-6">
                  Monitor your crops, track security alerts, and get AI-driven recommendations — all from one intuitive dashboard.
                </p>
                <ul className="space-y-3">
                  {["Real-time crop health monitoring", "Automated disease detection alerts", "Weather-integrated farming advice", "Security camera AI analysis", "Multi-language interface"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlight Box */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-primary opacity-90" />
                <img
                  src={keroAgriculture}
                  alt="Smart Farming in Rwanda"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10 p-8 md:p-14 text-center text-white">
                  <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Built for Real-World Impact
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                    Especially in smart farming and home security — empowering Rwandan communities with accessible AI technology.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://egreedtech.org" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="secondary" className="gap-2">
                        Visit egreedtech.org <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                    <a href="#waitlist">
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                        Request Early Access <ChevronRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Join the Waitlist Section */}
        <section className="py-20" id="waitlist">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the Waitlist
              </h2>
              <p className="text-muted-foreground mb-8">
                Be the first to experience KERO IWAWE ASSIST. Sign up for early access and get notified when we launch.
              </p>

              {isJoined ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-green-500/10 border border-green-500/30"
                >
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">You're on the list! 🎉</h3>
                  <p className="text-muted-foreground">We'll notify you as soon as KERO IWAWE ASSIST is ready.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-primary hover:from-green-700 hover:to-primary/90 text-white gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Joining...</>
                    ) : (
                      <><Mail className="w-4 h-4" /> Join the Waitlist</>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No spam, ever. We'll only email you about the launch.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default KeroIwaweAssist;
