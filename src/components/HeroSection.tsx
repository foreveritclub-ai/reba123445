import { motion } from "framer-motion";
import FloatingElement from "./FloatingElement";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Floating decorative elements */}
      <FloatingElement className="absolute top-20 left-[15%]" magnetStrength={0.5}>
        <div className="w-20 h-20 border border-primary/30 rounded-lg rotate-45 animate-float" />
      </FloatingElement>

      <FloatingElement className="absolute top-40 right-[20%]" magnetStrength={0.4}>
        <div className="w-16 h-16 bg-primary/20 rounded-full animate-float-delayed glow-soft" />
      </FloatingElement>

      <FloatingElement className="absolute bottom-32 left-[25%]" magnetStrength={0.6}>
        <div className="w-12 h-12 border-2 border-primary/40 rounded-full animate-spin-slow" />
      </FloatingElement>

      <FloatingElement className="absolute bottom-40 right-[15%]" magnetStrength={0.3}>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-float" />
      </FloatingElement>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block mb-6 px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full">
            Welcome to the future
          </span>
        </motion.div>

        <FloatingElement magnetStrength={0.1}>
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-foreground">Reba</span>
            <span className="text-primary"> RW</span>
          </motion.h1>
        </FloatingElement>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Crafting digital experiences that captivate, engage, and inspire. Where innovation meets elegant design.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <FloatingElement magnetStrength={0.2}>
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:glow-primary">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out_infinite] transition-opacity" />
            </button>
          </FloatingElement>

          <FloatingElement magnetStrength={0.2}>
            <button className="px-8 py-4 border border-muted-foreground/30 text-foreground font-semibold rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300">
              Learn More
            </button>
          </FloatingElement>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
