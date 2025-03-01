import HeroSection from "@/manualcomponents/landingpage/HeroSection";
import KeyFeaturesSection from '../../manualcomponents/landingpage/KeyFeatures';
import HowItWorksSection from '../../manualcomponents/landingpage/HowItWorks';
import TestimonialsSection from '../../manualcomponents/landingpage/Testimonials';
import Header from "@/manualcomponents/SiteHeader"; 
function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Body components go here */}
      <HeroSection />
      <KeyFeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
     
    </div>
  );
}

export default LandingPage;