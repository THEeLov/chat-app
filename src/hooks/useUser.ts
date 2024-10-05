import { useQuery } from "@tanstack/react-query";
import { getUserConversations } from "../api/conversationsApi";

export const useUserConversations = (userId: string) => {
  return useQuery({
    queryKey: ["userConversations", userId],
    queryFn: () => getUserConversations(userId),
  });
};
