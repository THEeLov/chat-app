import { Avatar, Box, LinearProgress, Paper, Typography } from "@mui/material";
import { useConversation } from "../../hooks/useConversation";
import useAuthData from "../../hooks/useAuthData";
import { useEffect, useRef, useState } from "react";
import { useListenMessages } from "../../hooks/useListenMessages";

const ShowUserMessages = ({ convId }: { convId: string }) => {
  const { data: usersConversation, isLoading } = useConversation(convId);
  const { messages } = useListenMessages(usersConversation);

  const { user } = useAuthData();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [usersConversation]);

  if (isLoading) {
    return <LinearProgress />;
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
        messages.map((message) => {
          const isCurrentUser = message.senderId === user?._id;
          return (
            <Box
              key={message._id}
              display="flex"
              flexDirection={isCurrentUser ? "row-reverse" : "row"}
              alignItems="center"
              marginBottom="1rem"
            >
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
                elevation={2}
                sx={{
                  padding: "0.75rem 1rem",
                  backgroundColor: isCurrentUser
                    ? "#1976d2"
                    : "rgba(255, 255, 255, 0.6)",
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

      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ShowUserMessages;
