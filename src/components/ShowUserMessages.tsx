import { Box } from "@mui/material";
import { useConversationAllMessages } from "../hooks/useConversation";

const ShowUserMessages = ({ convId }: { convId: string }) => {
  const { data: usersConversation, isLoading } =
    useConversationAllMessages(convId);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  console.log(usersConversation);

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      {usersConversation &&
        usersConversation.map((message) => (
          <Box key={message._id} padding="0.5rem">
            <p>{message.message}</p>
          </Box>
        ))}
    </Box>
  );
};

export default ShowUserMessages;
