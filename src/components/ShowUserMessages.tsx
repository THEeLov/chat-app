import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useConversation } from "../hooks/useConversation";
import useAuthData from "../hooks/useAuthData";
import { formatDistanceToNow } from "date-fns";

const ShowUserMessages = ({ convId }: { convId: string }) => {
  const { data: usersConversation, isLoading } = useConversation(convId);

  const { user } = useAuthData();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const [user1, user2] = usersConversation?.participants || [];

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      padding="1rem"
    >
      {usersConversation &&
        usersConversation.messages.map((message) => {
          const isCurrentUser = message.senderId === user?._id;
          return (
            <Box
              key={message._id}
              display="flex"
              flexDirection={isCurrentUser ? "row-reverse" : "row"}
              alignItems="center"
              marginBottom="1rem"
            >
              {/* Timestamp */}
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  marginTop: "0.5rem",
                  textAlign: isCurrentUser ? "right" : "left",
                  color: isCurrentUser ? "#e0e0e0" : "#888",
                }}
              >
                {formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true,
                })}
              </Typography>
              
              {/* Avatar */}
              <Avatar
                alt={
                  message.senderId === user1._id
                    ? user1.username
                    : user2.username
                }
                src={
                  message.senderId === user1._id
                    ? user1.profilePic
                    : user2.profilePic
                }
                sx={{
                  marginRight: isCurrentUser ? 0 : "1rem",
                  marginLeft: isCurrentUser ? "1rem" : 0,
                }}
              />

              {/* Message bubble */}
              <Paper
                elevation={1}
                sx={{
                  padding: "0.75rem 1rem",
                  backgroundColor: isCurrentUser ? "#1976d2" : "#f1f1f1",
                  color: isCurrentUser ? "#fff" : "#000",
                  borderRadius: "10px",
                  maxWidth: "60%",
                }}
              >
                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                  {message.message}
                </Typography>
              </Paper>
            </Box>
          );
        })}
    </Box>
  );
};

export default ShowUserMessages;
