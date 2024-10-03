import { Avatar, Box, Typography } from "@mui/material";
import useAuthData from "../hooks/useAuthData";
import { Conversation } from "../types";

const UserCard = ({ conservation }: { conservation: Conversation }) => {
  const [user1, user2] = conservation.participants;
  const { user } = useAuthData();

  const receiver = user?._id! === user1._id ? user2 : user1;

  return (
    <Box display="flex" padding="1rem" alignContent="center" border="1px solid black" gap="1rem">
      <Box>
        <Avatar src={receiver.profilePic} />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography >{receiver.username}</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
