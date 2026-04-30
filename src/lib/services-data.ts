import {
  Cloud, Shield, Server, Compass, Globe, Code2, Smartphone, Settings,
  GraduationCap, BrainCircuit, Database, Users,
  Bot, Sparkles, Megaphone, Search, Zap
} from "lucide-react";

export interface ServiceData {
  slug: string;
  icon: typeof Cloud;
  title: string;
  titleRw?: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  technologies: string[];
}

export const allServices: ServiceData[] = [
  {
    slug: "cloud-migration",
    icon: Cloud,
    title: "Cloud Migration & Management",
    category: "IT Consulting",
    description: "Seamlessly migrate your infrastructure to the cloud and optimize your cloud operations for maximum efficiency.",
    longDescription: "Our cloud migration experts help businesses in Rwanda and East Africa transition to modern cloud infrastructure. We assess your current systems, design an optimal cloud architecture, and execute a seamless migration with minimal downtime. Our ongoing management ensures your cloud environment remains cost-effective, secure, and performant.",
    features: ["AWS, Azure & Google Cloud migration", "Cloud architecture design", "Cost optimization & monitoring", "Hybrid cloud solutions"],
    benefits: ["Reduce infrastructure costs by up to 40%", "Improve system uptime to 99.9%", "Scale on demand without hardware investment", "Enhanced disaster recovery capabilities"],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud Platform", "Terraform", "Kubernetes", "Docker"],
  },
  {
    slug: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity Solutions",
    category: "IT Consulting",
    description: "Protect your business with comprehensive security assessments, implementation, and ongoing monitoring.",
    longDescription: "In an increasingly digital Rwanda, cybersecurity is critical. Our team provides end-to-end security services from vulnerability assessments to implementation of enterprise-grade security solutions. We help organizations comply with data protection regulations and build a security-first culture.",
    features: ["Security audits & vulnerability assessment", "Firewall & network security", "Data encryption & compliance", "Incident response planning"],
    benefits: ["Protect sensitive business and customer data", "Achieve compliance with international standards", "Reduce risk of costly data breaches", "24/7 threat monitoring and response"],
    technologies: ["SIEM Solutions", "Penetration Testing", "ISO 27001", "Zero Trust Architecture", "Endpoint Protection"],
  },
  {
    slug: "infrastructure-management",
    icon: Server,
    title: "Infrastructure Management",
    category: "IT Consulting",
    description: "Design, deploy, and manage robust IT infrastructure that scales with your business needs.",
    longDescription: "We design and manage IT infrastructure that forms the backbone of your digital operations. From network architecture to server management, our team ensures your technology infrastructure is reliable, secure, and ready to support business growth across Rwanda and beyond.",
    features: ["Network design & optimization", "Server management & virtualization", "Backup & disaster recovery", "24/7 IT support & monitoring"],
    benefits: ["Minimize downtime with proactive monitoring", "Optimize network performance", "Ensure business continuity with robust backups", "Reduce operational complexity"],
    technologies: ["VMware", "Cisco", "Linux/Windows Server", "Active Directory", "Nagios", "Zabbix"],
  },
  {
    slug: "it-strategy",
    icon: Compass,
    title: "IT Strategy & Planning",
    category: "IT Consulting",
    description: "Align your technology investments with business goals through strategic IT consulting and roadmap development.",
    longDescription: "Technology should drive business growth, not just support it. Our strategic consulting helps Rwandan businesses align their IT investments with long-term business objectives. We create detailed technology roadmaps, optimize IT budgets, and guide digital transformation initiatives.",
    features: ["Technology roadmap development", "Digital transformation strategy", "IT budget planning & optimization", "Vendor management & procurement"],
    benefits: ["Maximize ROI on technology investments", "Clear 3-5 year technology vision", "Reduced technology-related risks", "Better vendor relationships and costs"],
    technologies: ["ITIL Framework", "TOGAF", "Agile Methodologies", "Business Analysis", "Project Management"],
  },
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    category: "Development & Management",
    description: "Build stunning, responsive websites and web applications that drive engagement and conversions.",
    longDescription: "We create modern, high-performance websites and web applications tailored for Rwandan businesses and international markets. From corporate websites to complex web platforms, our development team delivers solutions that are beautiful, functional, and optimized for search engines.",
    features: ["Custom website design & development", "E-commerce platforms", "Content management systems", "Progressive web apps (PWA)"],
    benefits: ["Increased online visibility and traffic", "Higher conversion rates", "Mobile-optimized experiences", "Easy content management"],
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    slug: "mobile-development",
    icon: Smartphone,
    title: "Mobile App Development",
    category: "Development & Management",
    description: "Create powerful mobile applications for iOS and Android that deliver exceptional user experiences.",
    longDescription: "Rwanda's mobile-first economy demands excellent mobile applications. We build native and cross-platform mobile apps that provide seamless user experiences, integrate with local payment systems like MTN Mobile Money, and work reliably even in areas with limited connectivity.",
    features: ["Native iOS & Android apps", "Cross-platform development", "App maintenance & updates", "App Store optimization"],
    benefits: ["Reach customers on their preferred devices", "Integrate with local payment systems", "Offline-capable applications", "Continuous improvement and support"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "REST APIs"],
  },
  {
    slug: "custom-software",
    icon: Code2,
    title: "Custom Software Development",
    category: "Development & Management",
    description: "Build tailored software solutions that automate processes and solve unique business challenges.",
    longDescription: "Off-the-shelf software doesn't always fit unique business requirements. We develop custom software solutions that automate workflows, integrate disparate systems, and solve specific challenges faced by Rwandan businesses. From ERP systems to specialized tools, we build what you need.",
    features: ["Enterprise software solutions", "API development & integration", "Database design & management", "Legacy system modernization"],
    benefits: ["Software that fits your exact needs", "Improved operational efficiency", "Seamless integration with existing systems", "Scalable architecture for growth"],
    technologies: ["Python", "Java", "TypeScript", "PostgreSQL", "MongoDB", "Microservices"],
  },
  {
    slug: "website-management",
    icon: Settings,
    title: "Website & App Management",
    category: "Development & Management",
    description: "Comprehensive ongoing management and maintenance to keep your digital assets performing optimally.",
    longDescription: "Launching a website or app is just the beginning. Our management services ensure your digital assets remain secure, up-to-date, and performing at their best. We handle everything from security patches to content updates, freeing you to focus on your business.",
    features: ["Performance monitoring & optimization", "Security updates & patches", "Content updates & SEO management", "Analytics & reporting"],
    benefits: ["Peace of mind with expert management", "Improved search engine rankings", "Better user experience and performance", "Data-driven optimization decisions"],
    technologies: ["Google Analytics", "SEO Tools", "CDN", "Performance Monitoring", "Automated Backups"],
  },
  {
    slug: "professional-it-training",
    icon: GraduationCap,
    title: "Professional IT Training",
    titleRw: "Amahugurwa y'Ikoranabuhanga",
    category: "Training & Education",
    description: "Comprehensive training programs designed to upskill your team with the latest technologies and best practices.",
    longDescription: "Our professional IT training programs are designed to bridge the skills gap in Rwanda's growing tech sector. We offer certification-focused courses, hands-on bootcamps, and specialized training in cloud computing, cybersecurity, programming, and project management. All courses are taught by experienced practitioners.",
    features: ["Cloud certifications (AWS, Azure, GCP)", "Cybersecurity training & awareness", "Programming bootcamps", "IT project management"],
    benefits: ["Industry-recognized certifications", "Hands-on practical experience", "Career advancement opportunities", "Access to expert instructors"],
    technologies: ["AWS Certification", "Azure Certification", "CompTIA", "CISSP", "PMP", "Agile/Scrum"],
  },
  {
    slug: "corporate-workshops",
    icon: Users,
    title: "Corporate Workshops",
    titleRw: "Amasomo y'Ibigo",
    category: "Training & Education",
    description: "Customized training workshops tailored to your organization's specific technology needs and goals.",
    longDescription: "We deliver customized corporate training workshops designed to address your organization's specific technology challenges. Whether you need to upskill your team on new tools, improve cybersecurity awareness, or develop in-house technical capabilities, our workshops are practical, engaging, and results-focused.",
    features: ["On-site & remote training options", "Hands-on practical sessions", "Industry-recognized certificates", "Ongoing mentorship support"],
    benefits: ["Training tailored to your organization", "Improved team productivity", "Reduced dependency on external vendors", "Measurable skills improvement"],
    technologies: ["Custom Curriculum", "LMS Platforms", "Virtual Labs", "Assessment Tools"],
  },
  {
    slug: "ai-machine-learning",
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    titleRw: "Ubwenge Bwihindura",
    category: "AI & Data",
    description: "Leverage artificial intelligence to automate processes, gain insights, and drive innovation in your business.",
    longDescription: "Artificial intelligence is transforming businesses across Rwanda and Africa. Our AI team helps organizations identify high-impact AI use cases, develop and deploy machine learning models, and integrate AI capabilities into existing workflows. From natural language processing to computer vision, we make AI accessible and practical.",
    features: ["AI strategy & consulting", "Machine learning model development", "Natural language processing (NLP)", "Computer vision solutions"],
    benefits: ["Automate repetitive tasks", "Make data-driven decisions faster", "Unlock new revenue opportunities", "Gain competitive advantage"],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "MLOps"],
  },
  {
    slug: "data-analytics",
    icon: Database,
    title: "Data Analytics & BI",
    titleRw: "Isesengura ry'Amakuru",
    category: "AI & Data",
    description: "Transform raw data into actionable insights with our comprehensive data analytics and business intelligence services.",
    longDescription: "Data is your most valuable asset. Our data analytics services help Rwandan organizations collect, clean, analyze, and visualize their data to drive better business decisions. From building data warehouses to creating executive dashboards, we turn complex data into clear, actionable insights.",
    features: ["Data warehouse design", "Business intelligence dashboards", "Predictive analytics", "Data visualization & reporting"],
    benefits: ["Better decision-making with data insights", "Identify trends and opportunities early", "Optimize operations and reduce costs", "Executive-ready reporting"],
    technologies: ["Power BI", "Tableau", "Python", "SQL", "Apache Spark", "ETL Pipelines"],
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return allServices.find(s => s.slug === slug);
};
