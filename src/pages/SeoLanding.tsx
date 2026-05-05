import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

type PageContent = {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { h2: string; body: string }[];
};

const PAGES: Record<string, PageContent> = {
  "about-egreed-technology": {
    title: "About Egreed Technology LTD | EgreedTech Rwanda",
    metaDescription:
      "Learn about Egreed Technology LTD (EgreedTech) — a registered IT consulting and software development company based in Kigali, Rwanda.",
    h1: "About Egreed Technology LTD",
    intro:
      "Egreed Technology LTD, also known as Egreed Technology or EgreedTech, is a registered IT consulting and software development company based in Kigali, Rwanda. Officially registered with the Rwanda Development Board (RDB) on May 4, 2026, we serve schools, businesses, and institutions across Rwanda and East Africa.",
    sections: [
      {
        h2: "Who is Egreed Technology?",
        body: "Egreed Technology LTD (EgreedTech, Egreed Tech) is led by CEO Brayan Bayishime Shema. We design school management systems, build custom software, and provide IT consulting that helps Rwandan organizations operate digitally and competitively.",
      },
      {
        h2: "Why Choose EgreedTech",
        body: "From cloud hosting to data processing, system design, and computer training — Egreed Technology LTD delivers trusted, locally-built solutions tailored for the Rwandan and East African market.",
      },
      {
        h2: "Searching for Egreed Technology?",
        body: "If you are searching for Egreed Technology, Egreed Technology LTD, EgreedTech, or egreedtechnology in Rwanda, this is the official website.",
      },
    ],
  },
  "it-consulting-rwanda": {
    title: "IT Consulting Rwanda | Egreed Technology LTD (EgreedTech)",
    metaDescription:
      "Egreed Technology LTD provides leading IT consulting services in Rwanda — cloud, cybersecurity, system design, and digital transformation in Kigali.",
    h1: "IT Consulting Services in Rwanda",
    intro:
      "Egreed Technology LTD (EgreedTech) is a leading IT consulting company in Kigali, Rwanda, helping organizations modernize their technology with cloud, security, and bespoke software strategies.",
    sections: [
      {
        h2: "Our IT Consulting Approach",
        body: "Egreed Technology LTD combines local Rwandan market knowledge with international best practices. Our consultants assess your systems, design a roadmap, and execute with measurable outcomes.",
      },
      {
        h2: "Services We Provide",
        body: "Cloud migration (AWS, Azure, Google Cloud), cybersecurity audits, IT infrastructure management, custom software development, school management systems, data processing, and computer training.",
      },
      {
        h2: "Trusted IT Company in Kigali",
        body: "Egreed Technology LTD is a registered IT consulting and software development company in Kigali, Rwanda specializing in school management systems and digital solutions across East Africa.",
      },
    ],
  },
  "school-management-system-rwanda": {
    title: "School Management System Rwanda | Egreed Technology LTD",
    metaDescription:
      "Egreed Technology LTD builds modern school management systems in Rwanda — student records, fees, attendance, and parent communication for Kigali schools.",
    h1: "School Management System in Rwanda",
    intro:
      "Egreed Technology LTD (EgreedTech) develops affordable, cloud-based school management systems for primary, secondary, and higher-education schools in Rwanda and East Africa.",
    sections: [
      {
        h2: "What Our School ERP Includes",
        body: "Student registration, attendance tracking, fee management, grading, timetables, parent communication portals, and reporting dashboards — all hosted securely on the cloud.",
      },
      {
        h2: "Why Schools in Rwanda Choose EgreedTech",
        body: "Built for the Rwandan education sector, our system supports English and Kinyarwanda, integrates with Mobile Money for fee collection, and is priced affordably for local schools.",
      },
      {
        h2: "Talk to Egreed Technology LTD",
        body: "Contact Egreed Technology LTD to request a demo of the school management system designed for Rwandan schools.",
      },
    ],
  },
  "software-development-rwanda": {
    title: "Software Development Rwanda | Egreed Technology LTD (EgreedTech)",
    metaDescription:
      "Custom software development in Rwanda by Egreed Technology LTD — web apps, mobile apps, SaaS platforms, and enterprise systems built in Kigali.",
    h1: "Software Development in Rwanda",
    intro:
      "Egreed Technology LTD (EgreedTech) is a software development company in Kigali, Rwanda building web applications, mobile apps, SaaS platforms, and enterprise systems for clients across East Africa.",
    sections: [
      {
        h2: "Custom Web & Mobile Apps",
        body: "We build modern web platforms with React and scalable backends, plus native and cross-platform mobile apps tailored to Rwandan businesses, schools, and NGOs.",
      },
      {
        h2: "Enterprise & SaaS Systems",
        body: "Egreed Technology LTD designs SaaS products and enterprise systems with secure authentication, role-based access, payments, and analytics — engineered for reliability.",
      },
      {
        h2: "Why Egreed Technology LTD",
        body: "As a Rwanda Development Board (RDB) registered company, Egreed Technology LTD combines technical depth, local presence, and competitive pricing to deliver software you can trust.",
      },
    ],
  },
};

const SeoLanding = () => {
  const { slug = "" } = useParams();
  const page = PAGES[slug];

  useEffect(() => {
    if (!page) return;
    document.title = page.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", page.metaDescription);
  }, [page]);

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold">Page not found</h1>
          <Link to="/" className="text-primary underline mt-4 inline-block">
            Back to Egreed Technology LTD
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WhatsAppButton />
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.h1}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{page.intro}</p>
        <div className="space-y-10">
          {page.sections.map((s) => (
            <section key={s.h2}>
              <h2 className="text-2xl font-bold mb-3 text-primary">{s.h2}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl border border-border/50 bg-card">
          <h2 className="text-xl font-bold mb-2">Get in touch with Egreed Technology LTD</h2>
          <p className="text-muted-foreground mb-4">
            Visit our <Link to="/" className="text-primary underline">homepage</Link>, explore our{" "}
            <Link to="/#services" className="text-primary underline">services</Link>, or{" "}
            <Link to="/#contact" className="text-primary underline">contact us</Link> in Kigali, Rwanda.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/about-egreed-technology" className="px-3 py-1.5 rounded-full bg-primary/10 text-primary">Egreed Technology LTD</Link>
            <Link to="/it-consulting-rwanda" className="px-3 py-1.5 rounded-full bg-primary/10 text-primary">IT consulting company in Rwanda</Link>
            <Link to="/school-management-system-rwanda" className="px-3 py-1.5 rounded-full bg-primary/10 text-primary">School Management System Rwanda</Link>
            <Link to="/software-development-rwanda" className="px-3 py-1.5 rounded-full bg-primary/10 text-primary">Software Development Rwanda</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeoLanding;
