import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Brain, 
  Eye, 
  Code2, 
  TrendingUp, 
  Blocks, 
  Shield, 
  Rocket, 
  Cpu,
  Search,
  Sparkles
} from "lucide-react";

const topics = [
  {
    icon: Brain,
    title: "Large Language Models & Multimodal AI",
    description: "Advanced LLM architecture with 175B+ parameters, multimodal processing capabilities, and sophisticated reasoning.",
    tags: ["Transformer Architecture", "Multimodal Fusion", "Chain-of-Thought Reasoning", "Constitutional AI", "Neural Scaling Laws"],
  },
  {
    icon: Eye,
    title: "Multimodal Processing Capabilities",
    description: "Advanced processing of text, images, audio, video, and code with cross-modal understanding and generation.",
    tags: ["Computer Vision", "Speech Recognition", "Code Intelligence", "Video Analysis", "Document Understanding"],
  },
  {
    icon: Code2,
    title: "Advanced Software Engineering",
    description: "Mastery of modern development practices, architecture patterns, and emerging programming paradigms.",
    tags: ["Microservices", "Event-Driven Architecture", "Domain-Driven Design", "DevOps", "Performance Optimization"],
  },
  {
    icon: TrendingUp,
    title: "Strategic Business Intelligence",
    description: "Advanced business strategy, market analysis, and organizational transformation expertise.",
    tags: ["Blue Ocean Strategy", "Platform Economics", "Venture Capital", "M&A Strategy", "Global Expansion"],
  },
  {
    icon: Blocks,
    title: "Digital Innovation & Web3",
    description: "Expertise in blockchain, DeFi, NFTs, and the decentralized web ecosystem.",
    tags: ["Smart Contracts", "DeFi Protocols", "NFT Marketplaces", "DAO Governance", "Metaverse Development"],
  },
  {
    icon: Shield,
    title: "Advanced Cybersecurity & Privacy",
    description: "Cutting-edge security research, zero-trust architecture, and privacy-preserving technologies.",
    tags: ["Zero-Trust Security", "Homomorphic Encryption", "Differential Privacy", "Threat Intelligence", "Quantum-Safe Cryptography"],
  },
  {
    icon: Rocket,
    title: "Venture Capital & Innovation",
    description: "Deep understanding of startup ecosystems, funding strategies, and innovation management.",
    tags: ["Unicorn Strategies", "Deep Tech Ventures", "ESG Investing", "Corporate Innovation", "Exponential Organizations"],
  },
  {
    icon: Cpu,
    title: "Emerging Technologies Integration",
    description: "Expertise in integrating AI, IoT, AR/VR, and other emerging technologies into practical solutions.",
    tags: ["AR/VR Development", "IoT Architecture", "Digital Twins", "Brain-Computer Interfaces", "Synthetic Biology"],
  },
];

const capabilities = [
  { icon: Brain, title: "LLM Architecture", desc: "175B+ parameters with transformer-based multimodal processing" },
  { icon: Eye, title: "Multimodal AI", desc: "Process text, images, audio, video, and code simultaneously" },
  { icon: Sparkles, title: "Advanced Reasoning", desc: "Chain-of-thought reasoning with 128K token context window" },
  { icon: Cpu, title: "Real-time Learning", desc: "Continuous learning and adaptation from conversations" },
];

const LLMSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="llm" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Egreed <span className="text-primary">LLM Knowledge Base</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Our advanced Large Language Model (LLM) with 175B+ parameters provides multimodal AI capabilities, processing text, images, code, audio, and video with sophisticated reasoning across all domains of knowledge.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search knowledge topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              className="group bg-gradient-card border-gradient rounded-xl p-6 hover:glow-primary transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <topic.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors text-sm">
                {topic.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                {topic.description}
              </p>
              <div className="space-y-1">
                <span className="text-xs font-medium text-accent">Key Topics:</span>
                <div className="flex flex-wrap gap-1">
                  {topic.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {topic.tags.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                      +{topic.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <motion.div
          className="bg-card border border-border/50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-center mb-8">
            Egreed LLM <span className="text-primary">Capabilities</span>
          </h3>
          <p className="text-center text-muted-foreground text-sm mb-8 max-w-2xl mx-auto">
            Our Large Language Model with 175B+ parameters provides multimodal AI capabilities, advanced reasoning, and comprehensive knowledge across all domains with human-level understanding.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <div key={cap.title} className="text-center p-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <cap.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-sm">{cap.title}</h4>
                <p className="text-xs text-muted-foreground">{cap.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LLMSection;
