import { Avatar, Box, Typography } from "@mui/material";
import useAuthData from "../../hooks/useAuthData";
import { Conversation } from "../../types";
import { useConverstationContext } from "../../hooks/contexts/useConversationContext";

const UserCard = ({
  conversation,
  isOnline,
}: {
  conversation: Conversation;
  isOnline: boolean;
}) => {

  const { user } = useAuthData();
  const { openConversationId, handleChatSwap } = useConverstationContext();

  const [user1, user2] = conversation.participants;
  const receiver = user?._id! === user1._id ? user2 : user1;

  return (
    <Box
      display="flex"
      padding="1rem"
      alignContent="center"
      gap="1rem"
      sx={{
        transition: "background 0.2s ease-in-out",
        background: openConversationId === conversation._id ? "rgba(255,255,255,0.2)" : "transparent",
        "&:hover": {
          cursor: "pointer",
          background: "rgba(255,255,255,0.2)",
        },
      }}
      component="div"
      onClick={() => handleChatSwap(conversation._id, receiver._id, )}
    >
      <Box position="relative">
        <Avatar src={receiver.profilePic} />
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: isOnline ? "#33CC00" : "#888888",
            border: "2px solid transparent",
          }}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography>{receiver.username}</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
