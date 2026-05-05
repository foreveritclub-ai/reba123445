import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getServiceBySlug, allServices } from "@/lib/services-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";
import NotFound from "./NotFound";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) return <NotFound />;

  const relatedServices = allServices
    .filter(s => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{`${service.title} in Rwanda | Egreed Technology LTD`}</title>
        <meta name="description" content={(service.longDescription || service.description).slice(0, 160)} />
        <link rel="canonical" href={`https://egreedtech.org/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${service.title} | Egreed Technology Rwanda`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={`https://egreedtech.org/services/${service.slug}`} />
        <meta property="og:image" content="https://egreedtech.org/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} | Egreed Technology Rwanda`} />
        <meta name="twitter:description" content={service.description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: "Egreed Technology LTD",
            url: "https://egreedtech.org",
            address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
            sameAs: [
              "https://twitter.com/EgreedTech",
              "https://www.linkedin.com/company/egreedtechnology",
              "https://www.facebook.com/egreedtechnology",
            ],
          },
          areaServed: { "@type": "Country", name: "Rwanda" },
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 bg-card/30">
          <div className="max-w-5xl mx-auto">
            <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{service.category}</span>
                {service.titleRw && <span className="text-xs text-muted-foreground">🇷🇼 {service.titleRw}</span>}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">{service.longDescription}</p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map(f => (
                  <div key={f} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Benefits */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                {service.benefits.map(b => (
                  <li key={b} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Technologies */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold mb-6">Technologies & Tools</h2>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium">{t}</span>
                ))}
              </div>
            </motion.section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Related Services</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedServices.map(rs => (
                    <Link key={rs.slug} to={`/services/${rs.slug}`} className="group p-5 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <rs.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{rs.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rs.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ServiceInquiryForm serviceSlug={service.slug} serviceName={service.title} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
