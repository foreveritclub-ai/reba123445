import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, User, Search, ArrowRight, Globe, Languages, Sparkles, Loader2 } from "lucide-react";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const categories = ["All", "Business & Tech Insights", "Web Development", "Digital Marketing", "Cybersecurity", "Digital Transformation", "Cloud Solutions", "IT Infrastructure", "IT Consulting", "Data Management", "Ikoranabuhanga", "Umutekano"];
const languages = [
  { id: "all", label: "All Languages", labelRw: "Indimi Zose", icon: Globe },
  { id: "en", label: "English", labelRw: "Icyongereza", icon: Languages },
  { id: "rw", label: "Kinyarwanda", labelRw: "Ikinyarwanda", icon: Languages },
];

// Kinyarwanda categories for language detection
const kinyarwandaCategories = ["Ikoranabuhanga", "Umutekano"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(newsletterEmail);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setSubscribing(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: result.data, source: "blog" });
    setSubscribing(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already subscribed — thank you!");
      } else {
        toast.error("Subscription failed. Please try again.");
      }
      return;
    }
    toast.success("Subscribed! Check your inbox for updates.");
    setNewsletterEmail("");
  };

  const { data: dbPosts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const posts = dbPosts || [];
  const featuredPosts = posts.slice(0, 3);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    // Language filter
    const isKinyarwanda = kinyarwandaCategories.includes(post.category);
    const matchesLanguage = selectedLanguage === "all" || 
      (selectedLanguage === "rw" && isKinyarwanda) ||
      (selectedLanguage === "en" && !isKinyarwanda);
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  // Get unique categories from posts
  const availableCategories = ["All", ...new Set(posts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4">
              IT Insights & Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Egreed Technology Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Expert insights on IT consulting, cloud solutions, cybersecurity, and digital transformation 
              for businesses in Rwanda and East Africa.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles... / Shakisha inyandiko..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Language Filter */}
      <section className="py-4 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              <Languages className="w-4 h-4 inline mr-1" />
              Language / Ururimi:
            </span>
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedLanguage === lang.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <lang.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{lang.label}</span>
                <span className="sm:hidden">{lang.id === "all" ? "All" : lang.id.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No articles found matching your criteria. / Nta nyandiko zibonetse.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge>
                            {post.category}
                          </Badge>
                          {kinyarwandaCategories.includes(post.category) && (
                            <Badge variant="secondary" className="bg-green-600 text-white">
                              🇷🇼 RW
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.read_time || "5 min read"}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            {kinyarwandaCategories.includes(post.category) ? "Soma Byinshi" : "Read More"} 
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with IT Insights
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to receive the latest articles on IT consulting, cloud solutions, 
              and cybersecurity trends in Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
