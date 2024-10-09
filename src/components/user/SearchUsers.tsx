import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { User } from "../../types";
import useAuthData from "../../hooks/useAuthData";
import { useConversationCreate } from "../../hooks/useConversation";
import AddIcon from "@mui/icons-material/Add";
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from "../../utils/showNotification";
import { isAxiosError } from "axios";

const SearchUsers = ({
  users,
  closeUsers,
}: {
  users: User[] | undefined;
  closeUsers: () => void;
}) => {
  const { user } = useAuthData();

  const { mutateAsync: createConversation } = useConversationCreate();

  const handleAddUser = async (senderId: string, receiverId: string) => {
    try {
      const data = {
        senderId,
        receiverId,
      };
      await createConversation(data);
      showSuccessNotification("Conversation successfully created.");
    } catch (error) {
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        if (statusCode === 409) {
          showWarningNotification("Conversation already established.");
        } else {
          showErrorNotification("Opps something went wrong.");
        }
      }
    }
    closeUsers();
  };

  return (
    <>
      {users && users.length > 0 && (
        <List>
          {users.map((optionUser: User) =>
            optionUser._id === user!._id ? null : (
              <ListItem key={optionUser._id}>
                {/* User avatar and info */}
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Box display="flex" alignItems="center" overflow="hidden">
                    <Avatar
                      alt={optionUser.username}
                      src={optionUser.profilePic}
                    />{" "}
                    <ListItemText
                      primary={optionUser.username}
                      secondary={optionUser.email}
                      sx={{ ml: 1 }}
                    />
                  </Box>

                  {/* User add button */}
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => handleAddUser(user!._id, optionUser._id)}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            )
          )}
        </List>
      )}
    </>
  );
};

export default SearchUsers;
