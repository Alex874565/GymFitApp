import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();

  return allowedRoles.includes(auth.roles) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
