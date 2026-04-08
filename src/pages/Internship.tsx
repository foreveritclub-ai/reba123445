import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap, Briefcase, Globe, Users, CheckCircle, Upload, ArrowRight,
  BookOpen, Shield, Clock, Star, Handshake, Code, Network, Cpu
} from "lucide-react";
import egreedLogo from "@/assets/egreed-logo.jpeg";
import ecodeLogo from "@/assets/ecode-logo.webp";
import partnershipBanner from "@/assets/partnership-banner.png";

const tvetPrograms = [
  "Computer System & Architecture (CSA)",
  "Software Development (SOD)",
  "Network & Internet Technology (NIT)",
];

const universityPrograms = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Networking / Cybersecurity",
  "Other ICT Program",
];

const formSchema = z.object({
  full_name: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Valid email required").max(255),
  phone: z.string().min(10, "Valid phone number required").max(20),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(2, "Address is required").max(200),
  education_level: z.enum(["TVET", "University"], { required_error: "Select education level" }),
  course_program: z.string().min(1, "Select your program"),
  current_level: z.string().min(1, "Current level is required").max(50),
  institution: z.string().min(2, "Institution name is required").max(200),
  preferred_shift: z.enum(["Morning", "Afternoon", "Evening", "Flexible"], { required_error: "Select preferred shift" }),
  portfolio_link: z.string().url().optional().or(z.literal("")),
  motivation_statement: z.string().min(20, "At least 20 characters").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const Internship = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [educationLevel, setEducationLevel] = useState<string>("");

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchedEducation = watch("education_level");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let cvUrl = "";
      if (cvFile) {
        const fileExt = cvFile.name.split(".").pop();
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("internship-cvs")
          .upload(filePath, cvFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("internship-cvs").getPublicUrl(filePath);
        cvUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from("internship_applications").insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        address: data.address,
        education_level: data.education_level,
        course_program: data.course_program,
        current_level: data.current_level,
        institution: data.institution,
        preferred_shift: data.preferred_shift,
        cv_url: cvUrl || null,
        portfolio_link: data.portfolio_link || null,
        motivation_statement: data.motivation_statement,
        user_id: user?.id || null,
      } as any);

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Application Submitted!", description: "We'll review your application and get back to you soon." });
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({ title: "Invalid File", description: "Only PDF files are accepted.", variant: "destructive" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File Too Large", description: "CV must be under 5MB.", variant: "destructive" });
        return;
      }
      setCvFile(file);
    }
  };

  const benefits = [
    { icon: Code, title: "Hands-on Experience", desc: "Work on real projects with professional teams" },
    { icon: Users, title: "Expert Mentorship", desc: "Learn from experienced developers and engineers" },
    { icon: GraduationCap, title: "Skill Development", desc: "Grow your technical and soft skills" },
    { icon: Briefcase, title: "Career Pathway", desc: "Open doors to full-time employment" },
    { icon: Globe, title: "Industry Exposure", desc: "Gain insight into Rwanda's growing tech scene" },
    { icon: Shield, title: "Certificate", desc: "Receive a professional internship certificate" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Partner Logos */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <img src={egreedLogo} alt="Egreed Technology" className="h-16 w-16 rounded-xl object-cover" />
              <Handshake className="w-8 h-8 text-primary" />
              <img src={ecodeLogo} alt="Ecode Technology" className="h-16 w-16 rounded-xl object-cover" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Egreed Technology × Ecode Technology Partnership</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Launch Your <span className="text-primary">Tech Career</span> with a Real Internship
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Apply for internship opportunities provided by <strong>Ecode Technology</strong>, integrated through
              our partnership with <strong>Egreed Technology</strong>. Gain real-world experience in software development,
              networking, and IT systems.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}>
              Apply for Internship <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partnership Banner */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
        >
          <img src={partnershipBanner} alt="Egreed & Ecode Technology Partnership" className="w-full h-auto" />
        </motion.div>
      </section>

      {/* Programs */}
      <section className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Apply?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Open to TVET and University students in ICT-related fields</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>TVET Students (L4–L5)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tvetPrograms.map(p => (
                  <li key={p} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>University Students</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {universityPrograms.map(p => (
                  <li key={p} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Intern With Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <b.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm">{b.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apply for Internship</h2>
            <p className="text-muted-foreground">Fill in the form below. Internships are provided by Ecode Technology.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Application Submitted!</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Thank you for applying. Our team will review your application and contact you via email or WhatsApp.
              </p>
              <Button variant="outline" onClick={() => window.location.href = "/"}>Back to Home</Button>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" /> Personal Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input id="full_name" {...register("full_name")} placeholder="John Doe" />
                        {errors.full_name && <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number (WhatsApp preferred) *</Label>
                        <Input id="phone" {...register("phone")} placeholder="+250 7XX XXX XXX" />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="date_of_birth">Date of Birth *</Label>
                        <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
                        {errors.date_of_birth && <p className="text-sm text-destructive mt-1">{errors.date_of_birth.message}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Current Address *</Label>
                        <Input id="address" {...register("address")} placeholder="Kigali, Rwanda" />
                        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" /> Education Details
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Education Level *</Label>
                        <Select onValueChange={(v) => { setValue("education_level", v as any); setEducationLevel(v); }}>
                          <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TVET">TVET (L4–L5)</SelectItem>
                            <SelectItem value="University">University</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.education_level && <p className="text-sm text-destructive mt-1">{errors.education_level.message}</p>}
                      </div>
                      <div>
                        <Label>Course / Program *</Label>
                        <Select onValueChange={(v) => setValue("course_program", v)}>
                          <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                          <SelectContent>
                            {(educationLevel === "TVET" ? tvetPrograms : universityPrograms).map(p => (
                              <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.course_program && <p className="text-sm text-destructive mt-1">{errors.course_program.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="current_level">Current Level / Year *</Label>
                        <Input id="current_level" {...register("current_level")} placeholder="e.g., L5, Year 3" />
                        {errors.current_level && <p className="text-sm text-destructive mt-1">{errors.current_level.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="institution">Institution Name *</Label>
                        <Input id="institution" {...register("institution")} placeholder="Your school / university" />
                        {errors.institution && <p className="text-sm text-destructive mt-1">{errors.institution.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Internship Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Internship Preferences
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Working Shift *</Label>
                        <Select onValueChange={(v) => setValue("preferred_shift", v as any)}>
                          <SelectTrigger><SelectValue placeholder="Select shift" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Morning">Morning</SelectItem>
                            <SelectItem value="Afternoon">Afternoon</SelectItem>
                            <SelectItem value="Evening">Evening</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.preferred_shift && <p className="text-sm text-destructive mt-1">{errors.preferred_shift.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="portfolio_link">Portfolio / GitHub Link (optional)</Label>
                        <Input id="portfolio_link" {...register("portfolio_link")} placeholder="https://github.com/..." />
                        {errors.portfolio_link && <p className="text-sm text-destructive mt-1">{errors.portfolio_link.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label>Upload CV (PDF, max 5MB)</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {cvFile ? cvFile.name : "Click to upload or drag & drop"}
                      </p>
                      <input type="file" accept=".pdf" onChange={handleCvChange} className="absolute inset-0 opacity-0 cursor-pointer" style={{ position: "relative" }} />
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <Label htmlFor="motivation_statement">Short Motivation Statement *</Label>
                    <Textarea
                      id="motivation_statement"
                      {...register("motivation_statement")}
                      placeholder="Tell us why you want this internship and what you hope to learn..."
                      rows={4}
                    />
                    {errors.motivation_statement && <p className="text-sm text-destructive mt-1">{errors.motivation_statement.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Internship;
