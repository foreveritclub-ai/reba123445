import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, Award, Quote } from "lucide-react";

const caseStudies = [
  {
    client: "Bank of Kigali",
    industry: "Financial Services",
    title: "Cloud Migration & Digital Transformation",
    description: "Migrated legacy banking systems to secure cloud infrastructure, enabling 24/7 digital banking services across Rwanda.",
    metrics: [
      { label: "System Uptime", value: "99.9%", icon: TrendingUp },
      { label: "Cost Reduction", value: "40%", icon: Award },
      { label: "Migration Time", value: "6 months", icon: Clock },
    ],
    testimonial: {
      quote: "Egreed Technology transformed our IT infrastructure, enabling us to serve millions of Rwandans with reliable digital banking services.",
      author: "Jean Claude Mukiza",
      role: "CTO, Bank of Kigali"
    },
    tags: ["Cloud Migration", "Security", "Banking"],
  },
  {
    client: "Rwanda Revenue Authority",
    industry: "Government",
    title: "Cybersecurity Enhancement Program",
    description: "Implemented comprehensive cybersecurity framework protecting sensitive taxpayer data and ensuring regulatory compliance.",
    metrics: [
      { label: "Security Incidents", value: "-95%", icon: TrendingUp },
      { label: "Compliance Score", value: "100%", icon: Award },
      { label: "Staff Trained", value: "500+", icon: Users },
    ],
    testimonial: {
      quote: "The cybersecurity solutions provided by Egreed have given us confidence in protecting Rwanda's critical financial data.",
      author: "Alice Uwimana",
      role: "IT Director, RRA"
    },
    tags: ["Cybersecurity", "Compliance", "Training"],
  },
  {
    client: "Kigali Health Institute",
    industry: "Healthcare",
    title: "Healthcare IT Infrastructure Modernization",
    description: "Designed and deployed integrated healthcare management system connecting hospitals across Kigali for better patient care.",
    metrics: [
      { label: "Patient Records", value: "1M+", icon: Users },
      { label: "Processing Speed", value: "10x", icon: TrendingUp },
      { label: "Implementation", value: "8 months", icon: Clock },
    ],
    testimonial: {
      quote: "Egreed's IT solutions have revolutionized how we manage patient care, improving outcomes for thousands of Rwandans.",
      author: "Dr. Emmanuel Habimana",
      role: "Director, Kigali Health Institute"
    },
    tags: ["Healthcare IT", "Integration", "Data Management"],
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Case Studies: Transforming Rwanda's IT Landscape
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped leading Rwandan organizations achieve digital transformation 
            through strategic IT consulting and innovative solutions.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Project Details */}
                    <div className="md:col-span-2 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="secondary">{study.industry}</Badge>
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {study.client}
                      </h3>
                      <h4 className="text-lg text-primary font-semibold mb-3">
                        {study.title}
                      </h4>
                      <p className="text-muted-foreground mb-6">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="text-center p-3 bg-muted/50 rounded-lg">
                            <metric.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                            <div className="text-xl md:text-2xl font-bold text-primary">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-primary/5 p-6 md:p-8 flex flex-col justify-center">
                      <Quote className="w-8 h-8 text-primary/30 mb-4" />
                      <blockquote className="text-sm md:text-base italic mb-4">
                        "{study.testimonial.quote}"
                      </blockquote>
                      <div>
                        <div className="font-semibold">{study.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {study.testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Ready to transform your organization's IT infrastructure?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
