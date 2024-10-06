import { useQuery } from "@tanstack/react-query";
import { getUserConversations } from "../api/conversationsApi";
import { getUsers } from "../api/usersApi";
import { FindUserSchemaType } from "../validationSchemas/forms";

export const useUserConversations = (userId: string) => {
  return useQuery({
    queryKey: ["userConversations", userId],
    queryFn: () => getUserConversations(userId),
  });
};

export const useUsersSearch = (email: string | undefined) => {
  return useQuery({
    queryKey: ["users", email],
    queryFn: () => getUsers(email)
  })
}