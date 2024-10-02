import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthData from "../hooks/useAuthData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { showErrorNotification } from "../utils/showNotification";

const Chats = () => {
  const { user } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      showErrorNotification("You must be logged in.");

      navigate("/signin");
    }
  }, [user, navigate]);

  if (user === null) {
    return null;
  }

  return (
    <Box
      minHeight="500px"
      borderRadius="8px"
      maxWidth="900px"
      width="100%"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
    >
      <Navbar />
      <Box></Box>
      <Footer />
    </Box>
  );
};

export default Chats;
