import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";

export default function TeacherDashboard({ isDarkTheme, onThemeToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <section
      className={`min-h-screen transition-colors duration-500 ${
        isDarkTheme
          ? "bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.14),_transparent_22%),linear-gradient(180deg,_#060816_0%,_#0b1020_48%,_#11172d_100%)]"
          : "bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.14),_transparent_24%),linear-gradient(180deg,_#f7faff_0%,_#eef4ff_100%)]"
      }`}
    >
      <TeacherSidebar
        isOpen={isSidebarOpen}
        isDarkTheme={isDarkTheme}
        onClose={() => setIsSidebarOpen(false)}
        onBackToSite={() => navigate("/")}
      />

      <div className="lg:pl-[18.5rem]">
        <TeacherNavbar
          user={user}
          roleLabel="Teacher"
          isDarkTheme={isDarkTheme}
          onThemeToggle={onThemeToggle}
          onMenuToggle={() => setIsSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet context={{ isDarkTheme }} />
        </main>
      </div>
    </section>
  );
}
