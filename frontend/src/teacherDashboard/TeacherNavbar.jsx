import DashboardNavbar from "../Dashboard/Components/DashboardNavbar";

export default function TeacherNavbar({
  user,
  roleLabel,
  isDarkTheme,
  onThemeToggle,
  onMenuToggle,
  onLogout,
}) {
  return (
    <DashboardNavbar
      user={user}
      roleLabel={roleLabel}
      isDarkTheme={isDarkTheme}
      onThemeToggle={onThemeToggle}
      onMenuToggle={onMenuToggle}
      onLogout={onLogout}
    />
  );
}
