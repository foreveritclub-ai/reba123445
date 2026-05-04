import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import egreedLogo from "@/assets/egreed-logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Courses", href: "/#courses" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];
const serviceLinks = [
  { label: "Cloud Migration", to: "/services/cloud-migration" },
  { label: "AI & Machine Learning", to: "/services/ai-machine-learning" },
  { label: "Data Analytics", to: "/services/data-analytics" },
  { label: "Web Development", to: "/services/web-development" },
  { label: "Cybersecurity", to: "/services/cybersecurity" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-4">
              <img src={egreedLogo} alt="Egreed Technology" className="h-12 w-auto" />
            </a>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Egreed Technology LTD — a Private Company Limited by Shares, officially registered with the Rwanda Development Board (RDB). Based in Kigali, serving clients across Rwanda and worldwide.
            </p>
            <a
              href="/certificate-egreedtechnology-LTD.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 text-xs rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              ✓ RDB Registered • View Certificate
            </a>
            <div className="space-y-3 text-sm">
              <a href="mailto:egreedtechnology@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                egreedtechnology@gmail.com
              </a>
              <a href="tel:+250795822290" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +250 795 822 290
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Kigali, Rwanda
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4">Ready to Start?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <a
              href="#contact"
              className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:glow-primary transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Egreed Technology LTD. All rights reserved. • CEO: Brayan Bayishime Shema
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <span className="flex items-center gap-2 text-muted-foreground">
                Made in <span>🇷🇼</span> Rwanda
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
