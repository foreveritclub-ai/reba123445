import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Award, Users, BarChart3, Clock,
  ArrowRight, ExternalLink, Sparkles, Check, ChevronRight, Star,
  Mail, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import egreedLearningHero from "@/assets/egreed-learning-hero.jpg";

const features = [
  { icon: BookOpen, title: "Professional IT Courses", emoji: "📚", description: "Comprehensive courses in web development, data science, cybersecurity, cloud computing, and more." },
  { icon: Award, title: "Certification Programs", emoji: "🏆", description: "Industry-recognized certifications that boost your career and validate your skills globally." },
  { icon: BarChart3, title: "Progress Tracking", emoji: "📊", description: "Track your learning journey with detailed analytics, milestones, and performance insights." },
  { icon: Users, title: "Expert Instructors", emoji: "👨‍🏫", description: "Learn from experienced professionals with real-world industry knowledge and expertise." },
  { icon: Clock, title: "Flexible Learning", emoji: "⏰", description: "Study at your own pace with on-demand video lessons, projects, and interactive quizzes." },
  { icon: Star, title: "Community Support", emoji: "🌟", description: "Join a vibrant community of learners, participate in forums, and collaborate on projects." },
];

const stats = [
  { value: "50+", label: "Professional courses" },
  { value: "15K+", label: "Active students" },
  { value: "95%", label: "Completion rate" },
  { value: "4.8★", label: "Average rating" },
];

const EgreedLearning = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist_signups").insert({ email: email.trim(), name: name.trim() || null, source: "egreed-learning" });
      if (error) {
        if (error.code === "23505") { toast.info("You're already on the waitlist!"); }
        else { throw error; }
      } else {
        toast.success("Welcome to the waitlist! We'll notify you when new courses launch.");
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
        <title>Egreed Learning - Professional IT Courses & Certifications | Egreed Technology</title>
        <meta name="description" content="Egreed Learning offers comprehensive e-learning with professional IT courses, certifications, and skill development programs for individuals and organizations in Rwanda." />
      </Helmet>
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blue-500/10 py-20 lg:py-28">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-3 h-3 mr-1" /> E-Learning Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                  Egreed{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    Learning
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
                  Master IT Skills. Build Your Future.
                </p>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                  Our comprehensive e-learning platform offering professional IT courses, certifications, and skill development programs for individuals and organizations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/learn">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2">
                      Browse Courses <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="https://learn.egreedtech.org" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="gap-2 border-blue-500/30 hover:bg-blue-500/10">
                      Visit Platform <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                  <img src={egreedLearningHero} alt="Egreed Learning Platform Dashboard" width={1280} height={720} className="w-full h-auto object-cover" />
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
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Designed for Rwandan learners with world-class content, expert instructors, and flexible learning paths.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:border-blue-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                          <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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

        {/* Highlight Box */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                <div className="relative z-10 p-8 md:p-14 text-center text-white">
                  <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Empowering Rwanda's Digital Future</h2>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                    From beginner to professional — our courses are designed to give Rwandan youth and professionals the skills they need for the digital economy.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/learn">
                      <Button size="lg" variant="secondary" className="gap-2">
                        Start Learning Today <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Courses CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Explore 50+ professional courses, get certified, and join a community of 15,000+ learners building the future of Rwanda.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/learn">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white gap-2">
                    Browse All Courses <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline" className="gap-2">
                    Contact Sales <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Waitlist Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2 mb-6">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Stay Updated</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Waitlist</h2>
              <p className="text-muted-foreground mb-8">Be the first to know about new courses, exclusive discounts, and platform updates.</p>

              {isJoined ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">You're on the list! 🎉</h3>
                  <p className="text-muted-foreground">We'll notify you about new courses and updates.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" className="flex-1" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email address" required className="flex-1" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white gap-2">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    {isSubmitting ? "Joining..." : "Join the Waitlist"}
                  </Button>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" /> Join 15,000+ learners already on the platform
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

export default EgreedLearning;
