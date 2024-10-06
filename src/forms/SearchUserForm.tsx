import {
  Avatar,
  Box,
  Divider,
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

const SearchUserForm = () => {
  const { watch, register } = useForm<FindUserSchemaType>({
    resolver: zodResolver(findUserSchema),
  });

  const [isFocused, setIsFocused] = useState(false);
  const currentEmail = watch("email");

  const { data: userList } = useUsersSearch(
    isFocused && currentEmail !== undefined ? currentEmail : undefined
  );

  function handleAddUser(_id: string): void {
    console.log("add me bro");
  }

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
          },
        }}
        variant="filled"
        {...register("email")}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />


      {/* This need to refactor to seperate component  */}
      {userList && userList.length > 0 && (
        <List>
          {userList.map((user: User) => (
            <ListItem key={user._id}>

              {/* User avatar and info */}
              <Box display="flex" justifyContent="space-between" width="100%">
                <Box display="flex" alignItems="center" overflow="hidden">
                  <Avatar alt={user.username} src={user.profilePic} />{" "}
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                    sx={{ ml: 1 }}
                  />
                </Box>

                {/* User add button */}
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleAddUser(user._id)}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchUserForm;
