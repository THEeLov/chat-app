import { Box } from "@mui/material";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChattingWindow from "../components/chat/ChattingWindow";

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
        <ChattingWindow />
      </Box>
      <Footer />
    </Box>
  );
};

export default Chats;
