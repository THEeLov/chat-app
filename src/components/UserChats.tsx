import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import useAuthData from "../hooks/useAuthData";
import { useUserConversations } from "../hooks/useUser";
import UserCard from "./UserCard";
import SendMessageForm from "../forms/SendMessageForm";
import { useState } from "react";
import ShowUserMessages from "./ShowUserMessages";

const UserChats = () => {
  const { user } = useAuthData();
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { data: userConversations, isLoading } = useUserConversations(
    user?._id!
  );

  console.log(userConversations);
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
    <Box display="flex" flex={1}>
      {/* Conversations Sidebar */}
      <Box width="250px" borderRight="1px solid grey">
        {userConversations?.map((conversation) => (
          <UserCard
            conservation={conversation}
            handleSwap={handleChatSwap}
            convId={conversation._id}
          />
        ))}
      </Box>

      {/* Chat Window */}
      {receiverId === null || conversationId === null ? (
        <Box> Hello user </Box>
      ) : (
        <Box display="flex" flexDirection="column" flex={1}>
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
