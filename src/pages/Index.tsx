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
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background scroll-smooth">
      <CustomCursor />
      <DiscountPopups />
      <WhatsAppButton />
      <Navbar />
      <HeroSection />
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
