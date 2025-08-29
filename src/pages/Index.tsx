
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NutshellSection from "@/components/NutshellSection";
import ProjectGrid from "@/components/ProjectGrid";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-blush-white">
      <Navbar />
      <div className="relative">
        <Hero />
      </div>
      <NutshellSection />
      <AboutSection />
      <ProjectGrid />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
