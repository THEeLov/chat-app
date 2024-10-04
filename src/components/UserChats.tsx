import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import useAuthData from "../hooks/useAuthData";
import { useUserConversations } from "../hooks/useUser";
import UserCard from "./UserCard";

const UserChats = () => {
  const { user } = useAuthData();
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

  return (
    <Box display="flex" flex={1}>
      {/* Conversations Sidebar */}
      <Box width="250px" borderRight="1px solid grey">
        {userConversations?.map((conversation) => <UserCard conservation={conversation} />)}
      </Box>


      {/* Chat Window */}
      <Box>
        <Box sx={{ flexGrow: 1, marginTop: 2, overflowY: "auto" }}>Chats</Box>
      </Box>
    </Box>
  );
};

export default UserChats;
