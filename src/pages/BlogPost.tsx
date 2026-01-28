import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

// Sample blog posts data (fallback if database is empty)
const samplePosts = [
  {
    id: "1",
    slug: "cloud-migration-guide-rwandan-smes",
    title: "Cloud Migration Guide for Rwandan SMEs: A Step-by-Step Approach",
    excerpt: "Learn how small and medium enterprises in Rwanda can successfully migrate to the cloud and reduce IT costs by up to 40%.",
    content: `
## Introduction

Cloud computing has become essential for businesses looking to scale efficiently and reduce operational costs. For Rwandan SMEs, cloud migration represents a significant opportunity to compete with larger enterprises while maintaining lean operations.

## Why Cloud Migration Matters for Rwandan Businesses

Rwanda's vision to become a regional tech hub makes cloud adoption crucial for local businesses. Here's why:

### Cost Efficiency
- **Reduced infrastructure costs**: No need for expensive on-premise servers
- **Pay-as-you-go model**: Only pay for what you use
- **Lower maintenance**: Cloud providers handle hardware maintenance

### Scalability
- Easily scale resources during peak business periods
- Expand to new markets without physical infrastructure
- Access enterprise-grade technology at SME prices

## Step-by-Step Migration Process

### Step 1: Assessment
Evaluate your current IT infrastructure and identify workloads suitable for cloud migration.

### Step 2: Planning
Create a detailed migration roadmap with timelines and resource allocation.

### Step 3: Choose Your Cloud Provider
Consider AWS, Microsoft Azure, or Google Cloud based on your specific needs.

### Step 4: Data Migration
Securely transfer your data using encryption and proper backup procedures.

### Step 5: Testing
Thoroughly test all applications in the cloud environment before full deployment.

### Step 6: Go Live
Execute the final migration with minimal downtime using proven strategies.

## Best Practices for Success

1. **Start Small**: Begin with non-critical workloads
2. **Train Your Team**: Invest in cloud skills development
3. **Monitor Continuously**: Use cloud monitoring tools
4. **Optimize Regularly**: Review and optimize costs monthly

## Conclusion

Cloud migration is not just a technology upgrade—it's a strategic business decision that can transform how Rwandan SMEs operate and compete in the digital economy.

Contact Egreed Technology for a free cloud readiness assessment tailored to your business needs.
    `,
    category: "Cloud Solutions",
    author: "Egreed Technology Team",
    read_time: "8 min read",
    created_at: "2024-01-15",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop"
  },
  {
    id: "2",
    slug: "cybersecurity-threats-east-africa-2024",
    title: "Top 10 Cybersecurity Threats Facing East African Businesses in 2024",
    excerpt: "Protect your business from the most common cyber threats targeting organizations in Rwanda and East Africa.",
    content: `
## Introduction

As digital transformation accelerates across East Africa, cybersecurity threats have evolved in sophistication and frequency. Understanding these threats is the first step to protecting your business.

## The Current Threat Landscape

East African businesses face unique challenges due to rapid digitization without proportional investment in security infrastructure.

## Top 10 Threats

### 1. Phishing Attacks
The most common attack vector, with criminals impersonating banks and government agencies.

### 2. Ransomware
Malicious software that encrypts data and demands payment, increasingly targeting healthcare and finance sectors.

### 3. Business Email Compromise (BEC)
Sophisticated attacks that manipulate employees into transferring funds or sharing sensitive information.

### 4. Mobile Banking Fraud
With high mobile money adoption, criminals target mobile financial services.

### 5. Insider Threats
Employees with access to sensitive systems pose significant risks, whether intentional or accidental.

### 6. Supply Chain Attacks
Targeting less secure suppliers to access larger organizations.

### 7. Cloud Misconfiguration
Improperly configured cloud services exposing sensitive data.

### 8. DDoS Attacks
Overwhelming systems with traffic to disrupt business operations.

### 9. Social Engineering
Manipulating employees to bypass security measures.

### 10. IoT Vulnerabilities
Connected devices without proper security creating network entry points.

## Protection Strategies

- Implement multi-factor authentication
- Regular security awareness training
- Maintain updated software and systems
- Deploy endpoint detection and response (EDR)
- Establish incident response plans

## Conclusion

Cybersecurity is not optional—it's a business necessity. Partner with Egreed Technology for comprehensive security assessments and protection strategies tailored to your organization.
    `,
    category: "Cybersecurity",
    author: "Egreed Technology Team",
    read_time: "10 min read",
    created_at: "2024-01-20",
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop"
  },
  {
    id: "3",
    slug: "digital-transformation-kigali-businesses",
    title: "Digital Transformation Success Stories: How Kigali Businesses Are Leading Innovation",
    excerpt: "Discover how local businesses in Kigali are leveraging technology to transform their operations and drive growth.",
    content: `
## Introduction

Kigali is emerging as a leading tech hub in Africa, with businesses across all sectors embracing digital transformation to improve efficiency and customer experience.

## Success Stories

### Banking Sector
Local banks have implemented mobile banking solutions that serve millions of customers, reducing branch dependency by 60%.

### Healthcare
Hospitals are using electronic health records and telemedicine to improve patient care and reach remote areas.

### Agriculture
AgriTech startups are connecting farmers directly to markets through mobile platforms.

## Key Transformation Trends

### 1. Mobile-First Strategies
With high mobile penetration, businesses are prioritizing mobile experiences.

### 2. Data Analytics
Organizations are using data to make informed decisions and personalize services.

### 3. Cloud Adoption
Moving to cloud infrastructure for scalability and cost efficiency.

### 4. E-commerce Integration
Traditional businesses are establishing online presence and digital sales channels.

## Lessons Learned

- Start with customer needs, not technology
- Invest in digital skills training
- Choose scalable solutions
- Partner with experienced technology providers

## The Road Ahead

Rwanda's ICT sector continues to grow, with government support through smart city initiatives and digital infrastructure investments.

## Conclusion

Digital transformation is not a destination—it's an ongoing journey. Egreed Technology can help your business navigate this journey successfully.
    `,
    category: "Digital Transformation",
    author: "Egreed Technology Team",
    read_time: "7 min read",
    created_at: "2024-02-01",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=630&fit=crop"
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      
      // Fallback to sample data if not found in database
      if (!data) {
        return samplePosts.find(p => p.slug === slug) || null;
      }
      
      return data;
    }
  });

  // Fallback for loading or not found
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <>
      <Helmet>
        <title>{post.title} | Egreed Technology Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://egreedtech.org/blog/${post.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <article className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Link to="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.read_time}</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.image_url && (
              <div className="mb-10 rounded-2xl overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={index} className="font-semibold">{paragraph.replace(/\*\*/g, '')}</p>;
                }
                if (paragraph.trim()) {
                  return <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{paragraph}</p>;
                }
                return null;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-primary/5 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help With Your IT Project?</h3>
              <p className="text-muted-foreground mb-6">
                Contact Egreed Technology for expert IT consulting services in Rwanda.
              </p>
              <Link to="/#contact">
                <Button size="lg">Get Free Consultation</Button>
              </Link>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
