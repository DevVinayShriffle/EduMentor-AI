export function getAppHomePath(role) {
  if (role === "teacher") return "/teacher";
  if (role === "student") return "/student";
  return "/dashboard";
}
