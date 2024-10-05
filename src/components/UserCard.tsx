import { Avatar, Box, Typography } from "@mui/material";
import useAuthData from "../hooks/useAuthData";
import { Conversation } from "../types";

const UserCard = ({
  conversation,
  handleSwap,
  convId,
  isActive
}: {
  conversation: Conversation;
  handleSwap: (recId: string, conId: string) => void;
  convId: string;
  isActive: boolean;
}) => {
  const [user1, user2] = conversation.participants;
  const { user } = useAuthData();

  const receiver = user?._id! === user1._id ? user2 : user1;

  return (
    <Box
      display="flex"
      padding="1rem"
      alignContent="center"
      gap="1rem"
      sx={{
        transition: "background 0.2s ease-in-out",
        background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
        "&:hover": {
          cursor: "pointer",
          background: "rgba(255,255,255,0.2)",
        },
      }}
      component="div"
      onClick={() => handleSwap(receiver._id, convId)}
    >
      <Box>
        <Avatar src={receiver.profilePic} />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography>{receiver.username}</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
