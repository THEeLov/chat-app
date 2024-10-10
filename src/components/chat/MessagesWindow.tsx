import { Box, Typography } from "@mui/material";
import useAuthData from "../../hooks/useAuthData";
import ShowUserMessages from "./ShowUserMessages";
import SendMessageForm from "../../forms/SendMessageForm";
import { useConverstationContext } from "../../hooks/contexts/useConversationContext";

const UserMessagesWindow = () => {

  const { user } = useAuthData();
  const { openConversationId, receiverId } = useConverstationContext();

  return (
    <>
      {receiverId === null || openConversationId === null ? (
        <Typography
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          component="h2"
          variant="h4"
          flexDirection="column"
          gap="1rem"
        >
          <Box>
            Hi&nbsp;<b>{user?.username} 👋</b>
          </Box>
          <Typography variant="body2">
            Select conversation to start chatting
          </Typography>{" "}
        </Typography>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="space-between"
        >
          <ShowUserMessages/>
          <Box padding="0.5rem">
            <SendMessageForm />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserMessagesWindow;
