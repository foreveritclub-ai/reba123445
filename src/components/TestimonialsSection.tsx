import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Reba RW transformed our startup with their strategic planning and custom software solutions. Their understanding of the local market combined with international standards made all the difference.",
    name: "Sarah Johnson",
    role: "CEO, TechStart Rwanda",
    avatar: "SJ",
  },
  {
    quote: "The software architecture they designed for us is robust and scalable. Six months later, we're handling 10x the traffic with zero downtime. Exceptional work from a truly professional team.",
    name: "Michael Uwimana",
    role: "CTO, Digital Solutions Ltd",
    avatar: "MU",
  },
  {
    quote: "Their digital engagement strategies boosted our online presence significantly. The team is responsive, creative, and delivers beyond expectations. Highly recommend for any digital transformation needs.",
    name: "Emma Rodriguez",
    role: "Marketing Director, GrowthCorp",
    avatar: "ER",
  },
];

const stats = [
  { value: "50+", label: "Satisfied Clients" },
  { value: "100+", label: "Projects Completed" },
  { value: "3+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Reba RW.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-gradient-card border-gradient rounded-2xl p-8 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="bg-card border border-border/50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
