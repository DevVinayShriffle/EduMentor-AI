import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import WhyChooseUs from "../sections/WhyChooseUs";
import Courses from "../sections/Courses";
import HowItWorks from "../sections/HowItWorks";
import MobileApp from "../sections/MobileApp";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      <Header />
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Courses />
      <HowItWorks />
      <MobileApp />
      <Contact />
      <Footer />
    </div>
  );
}
