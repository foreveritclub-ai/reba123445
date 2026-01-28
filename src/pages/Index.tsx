import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PartnersSection from "@/components/PartnersSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CompletedProjectsSection from "@/components/CompletedProjectsSection";
import ProductsSection from "@/components/ProductsSection";
import CoursesSection from "@/components/CoursesSection";
import LLMSection from "@/components/LLMSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PartnersSection />
      <CaseStudiesSection />
      <CompletedProjectsSection />
      <ProductsSection />
      <CoursesSection />
      <LLMSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
