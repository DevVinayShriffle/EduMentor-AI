import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import WhyChooseUs from "../sections/WhyChooseUs";
import Courses from "../sections/Courses";
import HowItWorks from "../sections/HowItWorks";
import MobileApp from "../sections/MobileApp";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      <Header />
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Courses />
      <HowItWorks />
      <MobileApp />
      <Footer />
    </div>
  );
}