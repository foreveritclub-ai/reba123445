import { motion } from "framer-motion";
import { GraduationCap, Code2, Cloud, Database, Settings, BookOpen, ShieldCheck } from "lucide-react";

const activities = [
  {
    icon: GraduationCap,
    title: "School Management Systems",
    description:
      "Complete school ERP for Rwanda — student registration, attendance, fees, grading, timetables and parent communication. The best school management system for primary, secondary and private schools in Kigali and across East Africa.",
    keywords: "school software Rwanda · student management Kigali",
  },
  {
    icon: Code2,
    title: "Web & Software Development",
    description:
      "Custom web applications, mobile apps, enterprise systems and SaaS platforms. A trusted custom software development company in Rwanda building scalable solutions for businesses and institutions.",
    keywords: "web application development Kigali · mobile apps Rwanda",
  },
  {
    icon: Cloud,
    title: "Hosting & Cloud Services",
    description:
      "Reliable cloud hosting services in Rwanda — secure deployments, managed servers, AWS / Azure / Google Cloud setup, backups and 24/7 uptime monitoring for schools and businesses.",
    keywords: "cloud hosting Rwanda · cloud migration Kigali",
  },
  {
    icon: Database,
    title: "Data Processing",
    description:
      "Professional database management systems in Rwanda — data entry, migration, analytics, reporting and automation that turns raw information into clear business insights.",
    keywords: "database management Rwanda · data analytics Kigali",
  },
  {
    icon: Settings,
    title: "IT Consulting & System Design",
    description:
      "Strategic IT consulting services in Rwanda — system architecture, digital transformation roadmaps, cybersecurity, and technology advisory for schools, SMEs and enterprises in Kigali.",
    keywords: "IT consulting Rwanda · system design East Africa",
  },
  {
    icon: BookOpen,
    title: "Computer Training",
    description:
      "Hands-on computer training in Kigali — coding bootcamps, Microsoft Office, web development, cybersecurity, and digital skills for students, professionals and TVET interns.",
    keywords: "computer training Kigali · tech courses Rwanda",
  },
];

const BusinessActivitiesSection = () => {
  return (
    <section id="activities" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">RDB-Licensed Business Activities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services &amp; Activities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Egreed Technology LTD is officially licensed by the <strong className="text-foreground">Rwanda Development Board (RDB)</strong> to deliver these six core technology services across <strong className="text-foreground">Kigali, Rwanda and East Africa</strong>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a, i) => (
            <motion.article
              key={a.title}
              className="bg-gradient-card border-gradient rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <a.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {a.description}
              </p>
              <p className="text-xs text-primary/80 font-medium">{a.keywords}</p>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
          Egreed Technology LTD is a legally registered private company in Rwanda providing trusted digital solutions for education, schools, and business systems across East Africa.
        </p>
      </div>
    </section>
  );
};

export default BusinessActivitiesSection;
