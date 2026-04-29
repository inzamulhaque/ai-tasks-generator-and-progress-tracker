import { Navigate, Outlet } from "react-router";
import { getToken } from "../../utils/tokenStore";

const ProtectedRoute = () => {
  const token = getToken("accessToken");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
