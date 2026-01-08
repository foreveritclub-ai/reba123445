import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Award, Users, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Strategic Focus",
    description: "We align technology solutions with your business objectives for maximum impact.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Our commitment to quality ensures reliable, scalable, and maintainable solutions.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description: "Your success is our priority. We build lasting partnerships, not just projects.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Drive",
    description: "We leverage cutting-edge technologies to keep you ahead of the competition.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Reba RW</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Born in Rwanda, built for the world. We're a passionate team of digital innovators dedicated to transforming businesses through technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-accent">Our Story</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Founded in the heart of Rwanda, Reba RW emerged from a vision to bridge the gap between ambitious business goals and cutting-edge technology solutions. We understand that every business is unique, which is why we specialize in creating tailored, scalable solutions that grow with our clients.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From startups taking their first digital steps to large enterprises optimizing their operations, we've helped businesses across various industries achieve their digital transformation goals. Our Rwanda-based roots give us a unique perspective on emerging markets while our global outlook ensures world-class solutions.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-card border-gradient rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-accent">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To empower businesses through innovative digital solutions that enhance operational efficiency, strengthen online presence, and drive sustainable growth.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <span className="text-sm text-primary font-medium">Building the future, together</span>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
