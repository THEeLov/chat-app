import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useAuthData from "../../hooks/useAuthData";
import { useUserConversations } from "../../hooks/useUser";
import UserCard from "./UserCard";
import SendMessageForm from "../../forms/SendMessageForm";
import { useState } from "react";
import ShowUserMessages from "./ShowUserMessages";
import { useSocket } from "../../hooks/useSocket";
import SearchUserForm from "../../forms/SearchUserForm";
import { useListenConversations } from "../../hooks/useListenOnSocket";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const UserChats = () => {
  const { user } = useAuthData();
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:700px)");

  const { onlineUsers } = useSocket();

  const { data: initialConversations, isLoading } = useUserConversations(
    user?._id!
  );

  const { conversations: userConversations } =
    useListenConversations(initialConversations);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleChatSwap = (recId: string, convId: string) => {
    setReceiverId(recId);
    setConversationId(convId);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box display="flex" flex={1} height="450px">
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
            <Box width="250px" borderRight="1px solid grey" overflow="auto">
              <SearchUserForm />
              {userConversations && userConversations.length > 0 ? (
                userConversations.map((conversation) => (
                  <UserCard
                    key={conversation._id}
                    conversation={conversation}
                    handleSwap={handleChatSwap}
                    convId={conversation._id}
                    isActive={conversationId === conversation._id}
                    isOnline={
                      (conversation.participants[0]._id === user?._id
                        ? onlineUsers?.includes(
                            conversation.participants[1]._id
                          )
                        : onlineUsers?.includes(
                            conversation.participants[0]._id
                          )) || false
                    }
                  />
                ))
              ) : (
                <Typography variant="body2" padding="1rem">
                  No conversations yet
                </Typography>
              )}
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Box width="250px" borderRight="1px solid grey" overflow="auto">
          <SearchUserForm />
          {userConversations && userConversations.length > 0 ? (
            userConversations.map((conversation) => (
              <UserCard
                key={conversation._id}
                conversation={conversation}
                handleSwap={handleChatSwap}
                convId={conversation._id}
                isActive={conversationId === conversation._id}
                isOnline={
                  (conversation.participants[0]._id === user?._id
                    ? onlineUsers?.includes(conversation.participants[1]._id)
                    : onlineUsers?.includes(
                        conversation.participants[0]._id
                      )) || false
                }
              />
            ))
          ) : (
            <Typography variant="body2" padding="1rem">
              No conversations yet
            </Typography>
          )}
        </Box>
      )}

      {/* Chat Window */}
      {receiverId === null || conversationId === null ? (
        <Typography
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          component="h2"
          variant="h4"
          flexDirection="column"
          gap="1rem"
        >
          <Box>
            Hi&nbsp;<b>{user?.username} 👋</b>
          </Box>
          <Typography variant="body2" component="h3">
            Select conversation to start chatting
          </Typography>{" "}
        </Typography>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="space-between"
        >
          <ShowUserMessages convId={conversationId} />
          <Box padding="0.5rem">
            <SendMessageForm receiverId={receiverId} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserChats;
