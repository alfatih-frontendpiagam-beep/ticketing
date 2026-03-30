import { Navigate } from "react-router-dom";
import authService from "../../services/AuthService";
const ProtectedRoute = ({ children, requiredRole }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const user = authService.getUser();
  const role = user?.role;
  if (requiredRole && role !== requiredRole) {
    if (role === "admin") {
      return <Navigate to="/ticket-monitoring" replace />;
    }
    return <Navigate to="/my-ticket" replace />;
  }
  return children;
};
export default ProtectedRoute;
