import { Navigate, Outlet } from "react-router-dom";
import useAuthData from "../hooks/useAuthData";
import { ConversationContextProvider } from "../contexts/ConversationContext";

const ProtectedRouteLayout = () => {
  const { user } = useAuthData();

  if (user === null) {
    console.log("Please run");
    return <Navigate to="/signin" />;
  }

  return (
    <ConversationContextProvider>
      <Outlet />
    </ConversationContextProvider>
  );
};

export default ProtectedRouteLayout;
