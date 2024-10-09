import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { FindUserSchemaType, findUserSchema } from "../validationSchemas/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";
import { useUsersSearch } from "../hooks/useUser";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchUsers from "../components/user/SearchUsers";

const SearchUserForm = () => {
  const { watch, register } = useForm<FindUserSchemaType>({
    resolver: zodResolver(findUserSchema),
  });

  const [isFocused, setIsFocused] = useState(false);

  const currentEmail = watch("email");

  const { data: userList } = useUsersSearch(
    isFocused && currentEmail !== undefined ? currentEmail : undefined
  );

  const closeUsers = () => {
    setIsFocused(false);
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
            endAdornment: isFocused ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsFocused(false)}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        variant="filled"
        {...register("email")}
        onFocus={() => setIsFocused(true)}
      />

      <SearchUsers users={userList} closeUsers={closeUsers}/>
    </Box>
  );
};

export default SearchUserForm;
