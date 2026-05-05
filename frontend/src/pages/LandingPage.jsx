import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import AuthDrawer from "../components/AuthDrawer";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white text-gray-900">
      <Header />
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => openAuth("login")}
        onSignupClick={() => openAuth("signup")}
        onDashboardClick={() => navigate("/dashboard")}
        onLogoutClick={handleLogout}
      />
      <Hero
        onGetStarted={() => {
          if (isAuthenticated) {
            navigate("/dashboard");
            return;
          }

          openAuth("signup");
        }}
        onExploreCourses={() => {
          window.location.hash = "#courses";
        }}
      />
      <About />
      <WhyChooseUs />
      <Courses />
      <HowItWorks />
      <MobileApp />
      <Contact />
      <Footer />
      <AuthDrawer
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={closeAuth}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
