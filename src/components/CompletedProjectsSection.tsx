import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "Muhazi Dental Clinic",
    client: "Muhazi Dental Clinic",
    description: "A modern, responsive website for a leading dental clinic in Rwanda featuring online appointment booking, service showcase, and patient information portal.",
    url: "https://muhazidentalclinic.org",
    services: ["Web Development", "UI/UX Design", "SEO Optimization", "Hosting & Maintenance"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop"
  }
];

const CompletedProjectsSection = () => {
  return (
    <section id="completed-projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Completed Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See some of our successfully delivered projects that are live and serving 
            clients across Rwanda.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Live Project
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="hidden md:block mb-4">
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                      ✓ Live & Active
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Client: {project.client}
                  </p>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Services Provided */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
                      Services Provided
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="flex items-center gap-1 px-3 py-1 bg-muted text-xs rounded-full"
                        >
                          <CheckCircle className="w-3 h-3 text-primary" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full sm:w-auto">
                      View Live Site
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjectsSection;
