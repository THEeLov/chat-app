import { useQuery, useMutation } from "@tanstack/react-query";
import { getConversationMessages, postConversation } from "../api/conversationsApi";
import { ConversationCreate } from "../types";

export const useConversation = (conversationId: string) => {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationMessages(conversationId),
  });
};

export const useConversationCreate = () => {
  return useMutation({
    mutationFn: (data: ConversationCreate) => postConversation(data) 
  })
}
