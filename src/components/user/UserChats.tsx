import { Box, CircularProgress, Typography } from "@mui/material";
import useAuthData from "../../hooks/useAuthData";
import { useUserConversations } from "../../hooks/useUser";
import UserCard from "./UserCard";
import SendMessageForm from "../../forms/SendMessageForm";
import { useState } from "react";
import ShowUserMessages from "./ShowUserMessages";

const UserChats = () => {
  const { user } = useAuthData();
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { data: userConversations, isLoading } = useUserConversations(
    user?._id!
  );

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

  return (
    <Box display="flex" flex={1} height="450px">
      {/* Conversations Sidebar */}
      <Box width="250px" borderRight="1px solid grey">
        {userConversations?.map((conversation) => (
          <UserCard
            conversation={conversation}
            handleSwap={handleChatSwap}
            convId={conversation._id}
            isActive={conversationId === conversation._id}
          />
        ))}
      </Box>

      {/* Chat Window */}
      {receiverId === null || conversationId === null ? (
        <Typography
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          component="h2"
          variant="h4"
        >
          Hi&nbsp;<b>{user?.username} 👋</b>{" "}
        </Typography>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="space-between"
        >
          <Box overflow="auto">
            <ShowUserMessages convId={conversationId} />
          </Box>
          <Box padding="0.5rem">
            <SendMessageForm receiverId={receiverId} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserChats;
