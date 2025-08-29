
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSectionAnimations } from "@/hooks/use-section-animations";

const Index = () => {
  // Initialize GSAP section animations
  useSectionAnimations();

  return (
    <div className="min-h-screen bg-blush-white">
      <Navbar />
      <div className="relative">
        <Hero />
      </div>
      <AboutSection />
      <ProjectGrid />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
