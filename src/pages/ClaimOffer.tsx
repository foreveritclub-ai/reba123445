import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, CheckCircle, ArrowRight, Sparkles, Copy, Check, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const perks = [
  "20% off any IT consulting service",
  "20% off all training courses",
  "20% off web & app development",
  "Free initial consultation session",
];

const ClaimOffer = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleCopy = () => {
    navigator.clipboard.writeText("EGREED20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      service: "20% Discount Offer — EGREED20",
      message: form.message || "Claimed 20% discount offer",
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Exclusive Limited Offer</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
                Save{" "}
                <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
                  20%
                </span>{" "}
                on Everything
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Claim your exclusive discount on all Egreed Technology services, courses, and development packages. No strings attached.
              </p>
            </motion.div>

            {/* Promo code card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-sm mx-auto mb-12"
            >
              <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 shadow-xl shadow-primary/5">
                <p className="text-sm text-muted-foreground mb-2">Your promo code</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-3xl font-black text-primary tracking-[0.15em]">EGREED20</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Copy code"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                  </button>
                </div>
                {copied && <p className="text-xs text-green-500 mt-2">Copied to clipboard!</p>}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What you get */}
        <section className="px-6 py-12 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-center mb-8">What You Get</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="font-medium">{perk}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Claim form */}
        <section className="px-6 py-12 max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {submitted ? (
              <div className="text-center bg-card border border-primary/30 rounded-2xl p-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Offer Claimed!</h3>
                <p className="text-muted-foreground mb-2">
                  Your promo code <span className="font-mono font-bold text-primary">EGREED20</span> is ready to use.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Our team will reach out shortly with your personalized discount details.
                </p>
                <Button onClick={() => navigate("/#contact")} className="bg-gradient-to-r from-primary to-orange-500 text-primary-foreground">
                  <Gift className="w-4 h-4 mr-2" /> Start a Project Now
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border/50 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">Claim Your Discount</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill in your details and we'll apply the 20% discount to your first order.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your full name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email address *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Company (optional)"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                  <Textarea
                    placeholder="Tell us what service you're interested in..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground font-bold text-base hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    {loading ? "Submitting..." : "Claim 20% Discount"}
                    {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              </div>
            )}

            {/* Contact alternatives */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
              <a href="tel:+250795822290" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +250 795 822 290
              </a>
              <a href="mailto:egreedtechnology@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> egreedtechnology@gmail.com
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClaimOffer;
