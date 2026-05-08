import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./Dashboard/Pages/DashboardPage";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import TeacherHome from "./teacherDashboard/TeacherHome";
import TeacherContent from "./teacherDashboard/TeacherContent";
import TeacherAssessments from "./teacherDashboard/TeacherAssessments";
import TeacherStudents from "./teacherDashboard/TeacherStudents";
import TeacherReports from "./teacherDashboard/TeacherReports";
import TeacherChatbot from "./teacherDashboard/TeacherChatbot";
import TeacherProfile from "./teacherDashboard/TeacherProfile";

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
            element={(
              <ProtectedRoute>
                <DashboardPage
                  isDarkTheme={isDarkTheme}
                  onThemeToggle={() => setIsDarkTheme((current) => !current)}
                />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/teacher"
            element={(
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard
                  isDarkTheme={isDarkTheme}
                  onThemeToggle={() => setIsDarkTheme((current) => !current)}
                />
              </ProtectedRoute>
            )}
          >
            <Route index element={<TeacherHome />} />
            <Route path="content" element={<TeacherContent />} />
            <Route path="assessments" element={<TeacherAssessments />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="reports" element={<TeacherReports />} />
            <Route path="chatbot" element={<TeacherChatbot />} />
            <Route path="profile" element={<TeacherProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
