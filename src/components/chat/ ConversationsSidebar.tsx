import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import UserConversations from "../user/UserConversations";

const ConversationsSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:700px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Conversations Sidebar (Mobile-friendly with Drawer) */}
      {isMobile ? (
        <Box>
          {/* Button to open the sidebar on mobile */}
          <IconButton
            onClick={toggleSidebar}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              position: "absolute",
              left: "20px",
              backgroundColor: "#1976d2",
              marginTop: "10px",
              zIndex: "1",
            }}
            size="large"
          >
            <QuestionAnswerIcon sx={{ color: "white" }} />
          </IconButton>

          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            sx={{ width: "100%", flexShrink: 0 }}
            PaperProps={{
              style: { width: "250px" },
            }}
          >
            <UserConversations />
          </Drawer>
        </Box>
      ) : (
        <UserConversations />
      )}
    </>
  );
};

export default ConversationsSidebar;
