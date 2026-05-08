import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";

export default function StudentDashboard({ isDarkTheme, onThemeToggle }) {
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
          ? "bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_22%),linear-gradient(180deg,_#06101f_0%,_#0b1526_48%,_#111c30_100%)]"
          : "bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_100%)]"
      }`}
    >
      <StudentSidebar
        isOpen={isSidebarOpen}
        isDarkTheme={isDarkTheme}
        onClose={() => setIsSidebarOpen(false)}
        onBackToSite={() => navigate("/")}
        onLogout={handleLogout}
      />

      <div className="lg:pl-[18.5rem]">
        <StudentNavbar
          user={user}
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
