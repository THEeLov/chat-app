import { Box, Snackbar } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthData from "../hooks/useAuthData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Chats = () => {
  const { user } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (user === null) {
    return null;
  }

  console.log("hello" + user);

  return (
    <Box
      minHeight="500px"
      borderRadius="8px"
      maxWidth="900px"
      width="100%"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)"}}
    >
      <Navbar />
      <Box></Box>
      <Footer />
    </Box>
  );
};

export default Chats;
