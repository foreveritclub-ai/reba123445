import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  description: string | null;
  url: string;
  image_url: string | null;
  client_name: string | null;
}

const CompletedProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("completed_projects")
        .select("id, name, description, url, image_url, client_name")
        .eq("is_active", true)
        .order("display_order");
      setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl h-80 animate-pulse" />
            ))
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                      ✓ Live
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-1">{project.name}</h3>
                  {project.client_name && (
                    <p className="text-xs text-muted-foreground mb-2">Client: {project.client_name}</p>
                  )}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="w-full">
                      View Live Site
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjectsSection;
