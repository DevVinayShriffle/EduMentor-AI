import { Outlet } from "react-router-dom";

export default function TeacherDashboard({ isDarkTheme, onThemeToggle }) {
  return <Outlet context={{ isDarkTheme, onThemeToggle }} />;
}
