import { Box } from "@mui/material";
import SignUpForm from "../forms/SignUpForm";
import useAuthData from "../hooks/useAuthData";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const { user } = useAuthData();

  if (user) {
    return <Navigate to="/chats" />;
  }

  return (
    <Box sx={{ backdropFilter: "blur(10px)" }}>
      <SignUpForm />
    </Box>
  );
};

export default SignUp;
