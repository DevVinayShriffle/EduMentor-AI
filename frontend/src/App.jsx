import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./Dashboard/Pages/DashboardPage";
import AiTutorPage from "./features/ai-tutor/pages/AiTutorPage";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.localStorage.getItem("app-theme") === "dark";
  });

  useEffect(() => {
    window.localStorage.setItem("app-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <LandingPage
                isDarkTheme={isDarkTheme}
                onThemeToggle={() => setIsDarkTheme((current) => !current)}
              />
            )}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage
                  isDarkTheme={isDarkTheme}
                  onThemeToggle={() => setIsDarkTheme((current) => !current)}
                />
              </ProtectedRoute>
            }
          >
            {/* Nested AI Tutor Route */}
            <Route
              path="ai-tutor"
              element={<AiTutorPage />}
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
