import { Box } from "@mui/material";
import ConversationsSidebar from "./ ConversationsSidebar";
import UserMessagesWindow from "./UserMessagesWindow";

const ChattingWindow = () => {

  return (
    <Box display="flex" flex={1} height="450px">
      {/* Conversations Sidebar (Mobile-friendly with Drawer) */}
      <ConversationsSidebar />

      {/* Chat Window */}
      <UserMessagesWindow />
    </Box>
  );
};

export default ChattingWindow;
