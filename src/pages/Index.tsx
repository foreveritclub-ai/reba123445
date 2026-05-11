import { Helmet } from "react-helmet-async";
import CustomCursor from "@/components/CustomCursor";
import DiscountPopups from "@/components/DiscountPopups";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BusinessActivitiesSection from "@/components/BusinessActivitiesSection";
import PartnersSection from "@/components/PartnersSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CompletedProjectsSection from "@/components/CompletedProjectsSection";
import ProductsSection from "@/components/ProductsSection";
import CoursesSection from "@/components/CoursesSection";
import LLMSection from "@/components/LLMSection";
import ComingSoonSection from "@/components/ComingSoonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import RegistrationSection from "@/components/RegistrationSection";
import BrandSearchSection from "@/components/BrandSearchSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE = "https://egreedtech.org";

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Egreed Technology LTD",
  alternateName: ["EgreedTech", "Egreed Tech", "egreedtechnology"],
  url: SITE,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const sitelinksLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Sign In", url: `${SITE}/signin`, description: "Log in to your Egreed Technology account." },
    { "@type": "SiteNavigationElement", position: 2, name: "Courses & Free Lessons", url: `${SITE}/products/egreed-learning`, description: "Free and paid IT courses for Rwandan learners." },
    { "@type": "SiteNavigationElement", position: 3, name: "IT Consulting Rwanda", url: `${SITE}/it-consulting-rwanda`, description: "Trusted IT consulting in Kigali, Rwanda." },
    { "@type": "SiteNavigationElement", position: 4, name: "School Management System", url: `${SITE}/school-management-system-rwanda`, description: "School management software for Rwandan schools." },
    { "@type": "SiteNavigationElement", position: 5, name: "Case Studies", url: `${SITE}/case-studies`, description: "Real client results from Egreed Technology." },
    { "@type": "SiteNavigationElement", position: 6, name: "Blog", url: `${SITE}/blog`, description: "Insights on technology, schools, and business in Rwanda." },
  ],
};

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background scroll-smooth">
      <Helmet>
        <link rel="canonical" href={SITE + "/"} />
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
        <script type="application/ld+json">{JSON.stringify(sitelinksLd)}</script>
      </Helmet>
      <CustomCursor />
      <DiscountPopups />
      <WhatsAppButton />
      <Navbar />
      <HeroSection />
      <BrandSearchSection />
      <AboutSection />
      <ServicesSection />
      <BusinessActivitiesSection />
      <PartnersSection />
      <CaseStudiesSection />
      <CompletedProjectsSection />
      <ProductsSection />
      <CoursesSection />
      <LLMSection />
      <ComingSoonSection />
      <TestimonialsSection />
      <RegistrationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
