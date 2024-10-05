import { Navigate, Outlet } from "react-router-dom";
import useAuthData from "../hooks/useAuthData";

const ProtectedRouteLayout = () => {
  const { user } = useAuthData();

  if (user === null) {
    console.log("Please run");
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRouteLayout;
