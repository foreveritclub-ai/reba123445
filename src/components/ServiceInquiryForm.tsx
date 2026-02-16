import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Send, LogIn } from "lucide-react";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().max(1000).optional(),
});

interface Props {
  serviceSlug: string;
  serviceName: string;
}

const ServiceInquiryForm = ({ serviceSlug, serviceName }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("service_inquiries").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      company: result.data.company || null,
      message: result.data.message || null,
      service_slug: serviceSlug,
      service_name: serviceName,
      user_id: user?.id || null,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit inquiry. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Inquiry Submitted!", description: "We'll get back to you shortly." });
    }
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-2">Thank You!</h3>
        <p className="text-sm text-muted-foreground mb-4">Your inquiry has been submitted. Our team will contact you within 24 hours.</p>
        {!user && (
          <Link to="/signin" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
            <LogIn className="w-4 h-4" /> Sign in to track your inquiries
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-1">Get Started</h3>
      <p className="text-sm text-muted-foreground mb-5">Fill out the form and our team will reach out.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input placeholder="Your Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <Input placeholder="Phone Number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
        <Input placeholder="Company" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
        <Textarea placeholder="Tell us about your project..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={3} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
      {!user && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          <Link to="/signin" className="text-primary hover:underline">Sign in</Link> to track your enrollment status
        </p>
      )}
    </div>
  );
};

export default ServiceInquiryForm;
