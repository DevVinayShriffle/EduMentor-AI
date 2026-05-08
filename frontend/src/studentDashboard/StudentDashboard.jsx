import { Outlet } from "react-router-dom";

export default function StudentDashboard({ isDarkTheme, onThemeToggle }) {
  return <Outlet context={{ isDarkTheme, onThemeToggle }} />;
}
