import { motion } from "framer-motion";
import { ShieldCheck, Building2, Calendar, MapPin, User, FileText, Download } from "lucide-react";

const details = [
  { icon: Building2, label: "Official Name", value: "Egreed Technology LTD" },
  { icon: FileText, label: "Legal Type", value: "Private Company Limited by Shares" },
  { icon: Calendar, label: "Registration Date", value: "May 4, 2026" },
  { icon: MapPin, label: "Location", value: "Kigali, Rwanda" },
  { icon: User, label: "CEO", value: "Brayan Bayishime Shema" },
];

const activities = [
  "School Management Systems",
  "Web & Software Development",
  "Hosting & Cloud Services",
  "Data Processing",
  "IT Consulting & System Design",
  "Computer Training",
];

const RegistrationSection = () => {
  return (
    <section id="registration" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">RDB Officially Registered</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted & <span className="text-primary">Certified</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Egreed Technology LTD is officially registered with the Rwanda Development Board (RDB) as a legal Private Company.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-gradient-card border-gradient rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> Company Information
            </h3>
            <ul className="space-y-4">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <d.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{d.label}</div>
                    <div className="font-medium">{d.value}</div>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="/certificate-egreedtechnology-LTD.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:glow-primary transition-all"
            >
              <Download className="w-4 h-4" />
              View RDB Certificate
            </a>
          </motion.div>

          <motion.div
            className="bg-gradient-card border-gradient rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> Registered Business Activities
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {activities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border/50 hover:border-primary/40 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              All activities are officially licensed under Rwandan law via the Rwanda Development Board (RDB).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
