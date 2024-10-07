import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { FindUserSchemaType, findUserSchema } from "../validationSchemas/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";
import { User } from "../types";
import { useUsersSearch } from "../hooks/useUser";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import useAuthData from "../hooks/useAuthData";
import { useConversationCreate } from "../hooks/useConversation";
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from "../utils/showNotification";
import { isAxiosError } from "axios";
import ClearIcon from '@mui/icons-material/Clear';

const SearchUserForm = () => {
  const { watch, register } = useForm<FindUserSchemaType>({
    resolver: zodResolver(findUserSchema),
  });

  const [isFocused, setIsFocused] = useState(false);
  const { user } = useAuthData();

  const currentEmail = watch("email");

  const { data: userList } = useUsersSearch(
    isFocused && currentEmail !== undefined ? currentEmail : undefined
  );

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
  };


  return (
    <Box>
      <TextField
        label="Search for user ..."
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              isFocused ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsFocused(false)}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null
            ),
          },
        }}
        variant="filled"
        {...register("email")}
        onFocus={() => setIsFocused(true)}
      />

      {/* This need to refactor to seperate component  */}
      {userList && userList.length > 0 && (
        <List>
          {userList.map((optionUser: User) =>
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
    </Box>
  );
};

export default SearchUserForm;
