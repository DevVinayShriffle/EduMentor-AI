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
import { getAppHomePath } from "../utils/getAppHomePath";

export default function LandingPage({ isDarkTheme, onThemeToggle }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const handleAuthSuccess = (nextUser) => {
    setIsAuthOpen(false);
    navigate(getAppHomePath(nextUser?.role));
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={isDarkTheme ? "landing-theme-dark bg-slate-950 text-slate-100" : "bg-white text-gray-900"}>
      <Header isDarkTheme={isDarkTheme} />
      <Navbar
        isAuthenticated={isAuthenticated}
        isDarkTheme={isDarkTheme}
        onThemeToggle={onThemeToggle}
        onLoginClick={() => openAuth("login")}
        onSignupClick={() => openAuth("signup")}
        onDashboardClick={() => navigate(getAppHomePath(user?.role))}
        onLogoutClick={handleLogout}
      />
      <Hero
        onGetStarted={() => {
          if (isAuthenticated) {
            navigate(getAppHomePath(user?.role));
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
