import { Outlet } from "react-router-dom";
import AiTutorPage from "../../features/ai-tutor/pages/AiTutorPage";

export default function DashboardPage({ isDarkTheme, onThemeToggle }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onThemeToggle}>
        Toggle Theme ({isDarkTheme ? "Dark" : "Light"})
      </button>

      {/* Nested route content will render here */}
      <Outlet />
      <AiTutorPage />
    </div>
  );
}
