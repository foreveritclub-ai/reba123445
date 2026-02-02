import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Cloud, 
  Shield, 
  Server, 
  Compass, 
  Globe, 
  Code2, 
  Smartphone, 
  Settings,
  ArrowRight,
  GraduationCap,
  BrainCircuit,
  Database,
  Zap,
  Users,
  Award,
  BookOpen
} from "lucide-react";

const itConsultingServices = [
  {
    icon: Cloud,
    title: "Cloud Migration & Management",
    description: "Seamlessly migrate your infrastructure to the cloud and optimize your cloud operations for maximum efficiency.",
    features: [
      "AWS, Azure & Google Cloud migration",
      "Cloud architecture design",
      "Cost optimization & monitoring",
      "Hybrid cloud solutions",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Protect your business with comprehensive security assessments, implementation, and ongoing monitoring.",
    features: [
      "Security audits & vulnerability assessment",
      "Firewall & network security",
      "Data encryption & compliance",
      "Incident response planning",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "Design, deploy, and manage robust IT infrastructure that scales with your business needs.",
    features: [
      "Network design & optimization",
      "Server management & virtualization",
      "Backup & disaster recovery",
      "24/7 IT support & monitoring",
    ],
  },
  {
    icon: Compass,
    title: "IT Strategy & Planning",
    description: "Align your technology investments with business goals through strategic IT consulting and roadmap development.",
    features: [
      "Technology roadmap development",
      "Digital transformation strategy",
      "IT budget planning & optimization",
      "Vendor management & procurement",
    ],
  },
];

const developmentServices = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Build stunning, responsive websites and web applications that drive engagement and conversions.",
    features: [
      "Custom website design & development",
      "E-commerce platforms",
      "Content management systems",
      "Progressive web apps (PWA)",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Create powerful mobile applications for iOS and Android that deliver exceptional user experiences.",
    features: [
      "Native iOS & Android apps",
      "Cross-platform development",
      "App maintenance & updates",
      "App Store optimization",
    ],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Build tailored software solutions that automate processes and solve unique business challenges.",
    features: [
      "Enterprise software solutions",
      "API development & integration",
      "Database design & management",
      "Legacy system modernization",
    ],
  },
  {
    icon: Settings,
    title: "Website & App Management",
    description: "Comprehensive ongoing management and maintenance to keep your digital assets performing optimally.",
    features: [
      "Performance monitoring & optimization",
      "Security updates & patches",
      "Content updates & SEO management",
      "Analytics & reporting",
    ],
  },
];

const trainingServices = [
  {
    icon: GraduationCap,
    title: "Professional IT Training",
    titleRw: "Amahugurwa y'Ikoranabuhanga",
    description: "Comprehensive training programs designed to upskill your team with the latest technologies and best practices.",
    features: [
      "Cloud certifications (AWS, Azure, GCP)",
      "Cybersecurity training & awareness",
      "Programming bootcamps",
      "IT project management",
    ],
  },
  {
    icon: Users,
    title: "Corporate Workshops",
    titleRw: "Amasomo y'Ibigo",
    description: "Customized training workshops tailored to your organization's specific technology needs and goals.",
    features: [
      "On-site & remote training options",
      "Hands-on practical sessions",
      "Industry-recognized certificates",
      "Ongoing mentorship support",
    ],
  },
];

const aiDataServices = [
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    titleRw: "Ubwenge Bwihindura",
    description: "Leverage artificial intelligence to automate processes, gain insights, and drive innovation in your business.",
    features: [
      "AI strategy & consulting",
      "Machine learning model development",
      "Natural language processing (NLP)",
      "Computer vision solutions",
    ],
  },
  {
    icon: Database,
    title: "Data Analytics & BI",
    titleRw: "Isesengura ry'Amakuru",
    description: "Transform raw data into actionable insights with our comprehensive data analytics and business intelligence services.",
    features: [
      "Data warehouse design",
      "Business intelligence dashboards",
      "Predictive analytics",
      "Data visualization & reporting",
    ],
  },
];

const ServiceCard = ({ service, index, isInView }: { service: typeof itConsultingServices[0], index: number, isInView: boolean }) => (
  <motion.div
    className="group bg-gradient-card border-gradient rounded-2xl p-8 hover:glow-primary transition-all duration-500"
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.1 }}
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
);

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
            Comprehensive IT consulting and development services designed to propel your business forward. From strategic planning to implementation, we've got you covered.
          </p>
        </motion.div>

        {/* IT Consulting Services */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="text-accent">IT Consulting</span> Services
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {itConsultingServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Development & Management Services */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="text-accent">Development & Management</span> Services
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {developmentServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index + 4} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Training & Education Services */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
            <span className="text-accent">Training & Education</span> Services
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span className="text-sm">🇷🇼 Amahugurwa y'Ikoranabuhanga mu Rwanda</span>
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {trainingServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index + 8} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* AI & Data Services */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
            <span className="text-accent">AI & Data</span> Services
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            <span className="text-sm">🇷🇼 Ubwenge Bwihindura n'Isesengura ry'Amakuru</span>
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {aiDataServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index + 10} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Process steps */}
        <motion.div
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { step: "01", title: "Consultation", desc: "We analyze your needs and challenges" },
            { step: "02", title: "Strategy", desc: "We design a tailored IT solution" },
            { step: "03", title: "Implementation", desc: "We build and deploy your solution" },
            { step: "04", title: "Support", desc: "We provide ongoing management and support" },
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
