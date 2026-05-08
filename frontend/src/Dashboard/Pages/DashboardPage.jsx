import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardShell from "../Components/DashboardShell";
import DashboardHome from "./DashboardHome";
import { getRoleConfig } from "../configs/roleConfigs";

export default function DashboardPage({ isDarkTheme, onThemeToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const roleConfig = getRoleConfig(user?.role);
  const defaultActiveItemId = roleConfig.navigation[0]?.items[0]?.id || "dashboard-home";
  const [activeItemId, setActiveItemId] = useState(defaultActiveItemId);

  if (user?.role === "teacher") {
    return <Navigate to="/teacher" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <DashboardShell
      user={user}
      roleConfig={roleConfig}
      activeItemId={activeItemId}
      isDarkTheme={isDarkTheme}
      onThemeToggle={onThemeToggle}
      onItemSelect={setActiveItemId}
      onBackToSite={() => navigate("/")}
      onLogout={handleLogout}
    >
      {({ isDarkTheme }) => (
        <DashboardHome
          user={user}
          homeContent={roleConfig.home}
          isDarkTheme={isDarkTheme}
        />
      )}
    </DashboardShell>
  );
}
