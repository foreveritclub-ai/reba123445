import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Globe, Code2, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Strategic Planning",
    description: "Transform your vision into actionable digital strategies that drive growth and innovation.",
    features: [
      "Digital transformation roadmaps",
      "Technology stack recommendations",
      "Business process optimization",
      "Competitive analysis & market research",
    ],
  },
  {
    icon: Globe,
    title: "Website Management",
    description: "Complete website solutions from design to deployment, ensuring optimal performance and user experience.",
    features: [
      "Custom website development",
      "E-commerce solutions",
      "Performance optimization",
      "SEO & analytics integration",
    ],
  },
  {
    icon: Code2,
    title: "Software Architecture",
    description: "Build robust, scalable software solutions tailored to your specific business requirements.",
    features: [
      "Custom software development",
      "API design & integration",
      "Database architecture",
      "Cloud infrastructure setup",
    ],
  },
  {
    icon: Zap,
    title: "Digital Engagement",
    description: "Enhance your digital presence and customer engagement through innovative solutions.",
    features: [
      "Social media integration",
      "Customer portal development",
      "Mobile app solutions",
      "Digital marketing automation",
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-6 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive digital solutions designed to propel your business forward. From strategic planning to implementation, we've got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group bg-gradient-card border-gradient rounded-2xl p-8 hover:glow-primary transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Process steps */}
        <motion.div
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { step: "01", title: "Discovery", desc: "We understand your goals and requirements" },
            { step: "02", title: "Strategy", desc: "We create a tailored digital strategy" },
            { step: "03", title: "Development", desc: "We build and implement your solution" },
            { step: "04", title: "Support", desc: "We provide ongoing maintenance and support" },
          ].map((item, index) => (
            <div key={item.step} className="relative text-center p-6">
              <div className="text-5xl font-bold text-primary/20 mb-3">{item.step}</div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
              {index < 3 && (
                <div className="hidden lg:block absolute top-10 right-0 w-1/2 h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
