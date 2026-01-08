import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Index;
