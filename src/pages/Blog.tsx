import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "cloud-migration-guide-rwandan-smes",
    title: "Cloud Migration Guide for Rwandan SMEs: A Step-by-Step Approach",
    excerpt: "Learn how small and medium enterprises in Rwanda can successfully migrate to the cloud and reduce IT costs by up to 40%.",
    content: `Cloud migration has become essential for Rwandan businesses looking to compete in the digital economy. With Rwanda's Vision 2050 emphasizing digital transformation, SMEs must adapt to remain competitive.

Key benefits of cloud migration include reduced infrastructure costs, improved scalability, and enhanced data security. Companies like MTN Rwanda and Bank of Kigali have already seen significant improvements after migrating to cloud platforms.

Our recommended approach involves three phases: assessment, migration, and optimization. During assessment, evaluate your current infrastructure and identify workloads suitable for cloud migration. The migration phase should be executed incrementally, starting with non-critical systems.`,
    category: "Cloud Solutions",
    author: "Egreed Technology",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    tags: ["Cloud Migration", "SME", "Rwanda", "Digital Transformation"],
  },
  {
    id: 2,
    slug: "cybersecurity-threats-east-africa-2024",
    title: "Top 10 Cybersecurity Threats Facing East African Businesses in 2024",
    excerpt: "Protect your business from the most common cyber threats targeting organizations in Rwanda and East Africa.",
    content: `As Rwanda's digital economy grows, so do cybersecurity threats. In 2024, businesses face increasingly sophisticated attacks that can compromise sensitive data and disrupt operations.

The most common threats include phishing attacks targeting employees, ransomware targeting SMEs, and supply chain attacks. The National Cyber Security Authority (NCSA) has reported a 40% increase in cyber incidents in the past year.

To protect your business, implement multi-factor authentication, conduct regular security audits, and train employees on cybersecurity best practices. Partnering with experienced IT consultants can help you develop a comprehensive security strategy.`,
    category: "Cybersecurity",
    author: "Egreed Technology",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    tags: ["Cybersecurity", "Data Protection", "Rwanda", "Business Security"],
  },
  {
    id: 3,
    slug: "digital-transformation-kigali-businesses",
    title: "Digital Transformation Success Stories: How Kigali Businesses Are Leading Innovation",
    excerpt: "Discover how local businesses in Kigali are leveraging technology to transform their operations and drive growth.",
    content: `Building robust IT infrastructure is crucial for businesses in Kigali's competitive market. With the city's rapid technological advancement, companies must adopt best practices to stay ahead.

Key infrastructure components include reliable networking, secure data storage, and scalable computing resources. Many Kigali businesses are now adopting hybrid solutions that combine on-premise and cloud infrastructure.

Consider implementing redundant systems, regular backups, and disaster recovery plans. Partner with local IT consultants who understand Rwanda's regulatory requirements and can provide ongoing support.`,
    category: "IT Infrastructure",
    author: "Egreed Technology",
    date: "2024-01-05",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    tags: ["IT Infrastructure", "Kigali", "Business Growth", "Technology"],
  },
  {
    id: 4,
    slug: "digital-transformation-rwanda-government",
    title: "How Rwanda's Government Digital Services Are Setting African Standards",
    excerpt: "Explore how Rwanda has become a leader in government digital transformation and what private businesses can learn from these initiatives.",
    content: `Rwanda has emerged as Africa's leader in government digital services, with initiatives like Irembo transforming how citizens interact with public services. This digital transformation offers valuable lessons for private businesses.

The success of platforms like Irembo demonstrates the importance of user-centered design, robust security, and scalable infrastructure. Private businesses can adopt similar principles to improve their digital services.

Key takeaways include investing in digital literacy, prioritizing mobile-first design, and building secure, reliable systems. Rwanda's approach shows that digital transformation is achievable with the right strategy and partnerships.`,
    category: "Digital Transformation",
    author: "Egreed Technology",
    date: "2023-12-28",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    tags: ["Digital Transformation", "Government", "Rwanda", "Innovation"],
  },
  {
    id: 5,
    slug: "choosing-it-consultant-rwanda",
    title: "How to Choose the Right IT Consulting Partner in Rwanda",
    excerpt: "A comprehensive guide to selecting an IT consulting firm that aligns with your business goals and understands Rwanda's unique technological landscape.",
    content: `Selecting the right IT consulting partner can make or break your digital transformation journey. In Rwanda's growing tech ecosystem, businesses have many options, but not all consultants are created equal.

Look for consultants with proven experience in your industry, strong local knowledge, and a track record of successful projects. Check their certifications, client testimonials, and case studies.

Important factors include their understanding of Rwanda's regulatory environment, their approach to project management, and their ability to provide ongoing support. A good IT partner should feel like an extension of your team.`,
    category: "IT Consulting",
    author: "Egreed Technology",
    date: "2023-12-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    tags: ["IT Consulting", "Business Strategy", "Rwanda", "Partnership"],
  },
  {
    id: 6,
    slug: "data-backup-disaster-recovery-rwanda",
    title: "Data Backup and Disaster Recovery Strategies for Rwandan Companies",
    excerpt: "Protect your business from data loss with comprehensive backup and disaster recovery strategies tailored for the Rwandan business environment.",
    content: `Data is the lifeblood of modern businesses, and protecting it should be a top priority. Rwandan companies face unique challenges including power fluctuations and limited local data center options.

Effective backup strategies include the 3-2-1 rule: three copies of data, on two different media, with one offsite. Cloud-based backup solutions offer cost-effective options for businesses of all sizes.

Disaster recovery planning should include regular testing, clear procedures, and defined recovery time objectives. Partner with experienced IT consultants to develop a comprehensive data protection strategy.`,
    category: "Data Management",
    author: "Egreed Technology",
    date: "2023-12-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
    tags: ["Data Backup", "Disaster Recovery", "Rwanda", "Business Continuity"],
  },
];

const categories = ["All", "Cloud Solutions", "Cybersecurity", "IT Infrastructure", "Digital Transformation", "IT Consulting", "Data Management"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
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
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
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
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3">
                          {post.category}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
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
