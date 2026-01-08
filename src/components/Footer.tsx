import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = ["Home", "About Us", "Services", "Testimonials", "Contact"];
const serviceLinks = ["Strategic Planning", "Website Management", "Software Architecture", "Digital Engagement", "Custom Solutions"];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="text-2xl font-bold tracking-tight inline-block mb-4">
              <span className="text-foreground">Reba</span>
              <span className="text-primary"> RW</span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Empowering businesses through innovative software and digital solutions. Based in Rwanda, serving clients worldwide with customized, scalable technology solutions.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:hello@rebarw.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                hello@rebarw.com
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
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
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
                <li key={link}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
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
              © 2024 Reba RW. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
