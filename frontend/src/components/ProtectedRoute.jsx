import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAppHomePath } from "../utils/getAppHomePath";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getAppHomePath(user?.role)} replace />;
  }

  return children;
}
