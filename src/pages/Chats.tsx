import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserChats from "../components/UserChats";

const Chats = () => {
  return (
    <Box
      borderRadius="8px"
      maxWidth="1020px"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Navbar />
      <Box>
        <UserChats />
      </Box>
      <Footer />
    </Box>
  );
};

export default Chats;
