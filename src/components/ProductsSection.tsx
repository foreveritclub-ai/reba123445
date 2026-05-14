import { motion } from "framer-motion";
import { ExternalLink, GraduationCap, Activity, ArrowRight, Bot, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Project IGICU",
    description: "The Soil Intelligence Grid — bridging satellite data with IoT ground sensors and AI yield forecasting for Rwanda's agricultural transformation. Built for SpaceYield Rwanda & GLOC 2026.",
    url: "/products/igicu",
    icon: Satellite,
    features: ["Satellite Telemetry", "ESP32 IoT Sensors", "AI Yield-Forecasts", "GLOC 2026 Ready"],
    gradient: "from-indigo-600 via-blue-600 to-cyan-500",
    isInternal: true,
    badge: "Flagship",
  },
  {
    name: "Egreed Learn",
    description: "The Digital Excellence Academy — industry-aligned training in Full-Stack Development, IoT Engineering, and Strategic Design. Project-first learning powered by the E-Ai Framework.",
    url: "/products/egreed-learning",
    icon: GraduationCap,
    features: ["Full-Stack Architecture", "Hardware-Software Convergence", "High-End Identity Design", "E-Ai Framework"],
    gradient: "from-blue-600 to-purple-600",
    isInternal: true,
  },
  {
    name: "KERO IWAWE ASSIST",
    description: "An intelligent AI assistant designed to support agriculture, security, and everyday tasks using AI-powered technology built for Rwanda.",
    url: "/products/kero-iwawe-assist",
    icon: Bot,
    features: ["Smart AI Assistant", "Agriculture Support", "Security Monitoring", "Local Language Support"],
    gradient: "from-green-600 to-emerald-600",
    isInternal: true,
    badge: "Coming Soon",
  },
  {
    name: "Rebalive RW",
    description: "A cutting-edge health and wellness platform designed to connect Rwandans with healthcare services, wellness resources, and health information.",
    url: "/products/rebalive-rw",
    icon: Activity,
    features: ["Health Services", "Wellness Resources", "Health Tracking", "Expert Consultations"],
    gradient: "from-green-600 to-teal-600",
    isInternal: true,
    badge: "Coming Soon",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Product-Led Engineering by Egreed Technology
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From orbital data and IoT to learning ecosystems and health platforms — explore the products engineering Africa's industrial future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className={`bg-gradient-to-r ${product.gradient} p-8 text-white relative`}>
                  {'badge' in product && product.badge && (
                    <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <product.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                  </div>
                  <p className="text-white/90">{product.description}</p>
                </div>

                {/* Features */}
                <div className="p-6 flex-1">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Key Features
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  {'isInternal' in product && product.isInternal ? (
                    <Link to={product.url}>
                      <Button className="w-full group/btn">
                        Explore {product.name}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full group/btn">
                        Visit {product.name}
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
