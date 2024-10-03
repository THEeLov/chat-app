import { Box } from "@mui/material";
import SignInForm from "../forms/SignInForm";
import useAuthData from "../hooks/useAuthData";
import { Navigate } from "react-router-dom";
import "../styles/glowingBoarded.css"

const SignIn = () => {
  const { user } = useAuthData();

  if (user) {
    return <Navigate to="/chats" />;
  }

  return (
    <Box sx={{ backdropFilter: "blur(12px)" }} borderRadius="10px">
      <SignInForm />
    </Box>
  );
};

export default SignIn;
