import { motion } from "framer-motion";
import { Award, Cloud, Shield, Server, Database, Code } from "lucide-react";

const partners = [
  {
    name: "Amazon Web Services",
    icon: Cloud,
    description: "AWS Partner Network",
    color: "from-orange-500 to-yellow-500"
  },
  {
    name: "Microsoft Azure",
    icon: Server,
    description: "Microsoft Partner",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Google Cloud",
    icon: Database,
    description: "Google Cloud Partner",
    color: "from-red-500 to-yellow-500"
  },
  {
    name: "Cisco",
    icon: Shield,
    description: "Cisco Partner",
    color: "from-blue-600 to-blue-400"
  },
  {
    name: "CompTIA",
    icon: Award,
    description: "Certified Partner",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Linux Foundation",
    icon: Code,
    description: "Certified Partner",
    color: "from-yellow-500 to-orange-500"
  }
];

const certifications = [
  "AWS Solutions Architect",
  "Microsoft Azure Administrator",
  "Google Cloud Professional",
  "Cisco CCNA/CCNP",
  "CompTIA Security+",
  "ISO 27001 Compliant"
];

const PartnersSection = () => {
  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Trusted Partnerships
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Technology Partners & Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with leading technology providers to deliver world-class solutions 
            to businesses in Rwanda and East Africa.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${partner.color} p-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <partner.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{partner.name}</h3>
                <p className="text-xs text-muted-foreground">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-center mb-6">Our Team Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
