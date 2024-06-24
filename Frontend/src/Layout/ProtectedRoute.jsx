import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const token = jwtDecode(localStorage.getItem("token"));
  return allowedRoles.includes(token.Role) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
