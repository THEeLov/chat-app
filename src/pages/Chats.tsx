import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();
  // const { data: userConversations, isLoading } = useUserConversations(
  //   user?._id!
  // );

  return (
    <Box
      minHeight="500px"
      borderRadius="8px"
      maxWidth="900px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
    >
      <Navbar />
      <Box flex={1}>This is body</Box>
      <Footer />
    </Box>
  );
};

export default Chats;
