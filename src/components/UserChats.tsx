import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import useAuthData from "../hooks/useAuthData";
import { useUserConversations } from "../hooks/useUser";
import UserCard from "./UserCard";
import SendMessageForm from "../forms/SendMessageForm";
import { useState } from "react";

const UserChats = () => {
  const { user } = useAuthData();
  const [receiverId, setReceiverId] = useState<string | null>(null);

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

  const handleChatSwap = (id: string) => {
    setReceiverId(id);
  };

  return (
    <Box display="flex" flex={1}>
      {/* Conversations Sidebar */}
      <Box width="250px" borderRight="1px solid grey">
        {userConversations?.map((conversation) => (
          <UserCard conservation={conversation} handleSwap={handleChatSwap} />
        ))}
      </Box>

      {/* Chat Window */}
      {receiverId === null ? (
        <Box> Hello user </Box>
      ) : (
        <Box display="flex" flexDirection="column" flex={1}>
          <Box sx={{ flexGrow: 1, marginTop: 2, overflowY: "auto" }}>Chats</Box>
          <Box padding="0.5rem">
            <SendMessageForm receiverId={receiverId} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserChats;
