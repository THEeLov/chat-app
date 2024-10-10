import { Box, CircularProgress, Typography } from "@mui/material";
import SearchUserForm from "../../forms/SearchUserForm";
import { useUserConversations } from "../../hooks/useUser";
import useAuthData from "../../hooks/useAuthData";
import { useSocketContext } from "../../hooks/contexts/useSocketContext";
import { useListenConversations } from "../../hooks/useListenOnSocket";
import UserCard from "./UserCard";

const UserConversations = () => {
  const { user } = useAuthData();
  const { onlineUsers } = useSocketContext();

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

  return (
    <Box width="250px" borderRight="1px solid grey" overflow="auto">
      <SearchUserForm />
      {userConversations.length > 0 ? (
        userConversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (participant) => participant._id !== user?._id
          );

          return (
            <UserCard
              key={conversation._id}
              conversation={conversation}
              isOnline={onlineUsers?.includes(otherParticipant?._id!) || false}
            />
          );
        })
      ) : (
        <Typography variant="body2" padding="1rem">
          No conversations yet
        </Typography>
      )}
    </Box>
  );
};

export default UserConversations;
