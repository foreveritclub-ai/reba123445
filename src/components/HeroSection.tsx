import { motion } from "framer-motion";
import FloatingElement from "./FloatingElement";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 bg-gradient-hero">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Floating decorative elements */}
      <FloatingElement className="absolute top-32 left-[10%] hidden lg:block" magnetStrength={0.5}>
        <div className="w-20 h-20 border border-primary/30 rounded-xl rotate-12 animate-float" />
      </FloatingElement>

      <FloatingElement className="absolute top-48 right-[12%] hidden lg:block" magnetStrength={0.4}>
        <div className="w-14 h-14 bg-accent/20 rounded-full animate-float-delayed glow-accent" />
      </FloatingElement>

      <FloatingElement className="absolute bottom-40 left-[18%] hidden lg:block" magnetStrength={0.6}>
        <div className="w-10 h-10 border-2 border-primary/40 rounded-full animate-spin-slow" />
      </FloatingElement>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full bg-primary/5">
            <span>🇷🇼</span> Made in Rwanda
          </span>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Empowering Businesses Through
        </motion.p>

        <FloatingElement magnetStrength={0.08}>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-gradient">Digital Innovation</span>
          </motion.h1>
        </FloatingElement>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Egreed Technology delivers tailored software and digital solutions that transform how businesses operate. From strategic planning to software architecture, we help startups and enterprises thrive in the digital age.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <FloatingElement magnetStrength={0.2}>
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:glow-primary hover:scale-105">
              <span className="relative z-10">Start Your Project</span>
            </button>
          </FloatingElement>

          <FloatingElement magnetStrength={0.2}>
            <button className="px-8 py-4 border border-muted-foreground/30 text-foreground font-semibold rounded-xl hover:border-primary/50 hover:text-primary transition-all duration-300 hover:scale-105">
              Explore Services
            </button>
          </FloatingElement>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {stats.map((stat, index) => (
            <FloatingElement key={stat.label} magnetStrength={0.15}>
              <motion.div
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            </FloatingElement>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
