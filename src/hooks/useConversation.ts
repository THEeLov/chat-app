import { useQuery } from "@tanstack/react-query"
import { getConversationMessages } from "../api/conversationsApi"

export const useConversation = (conversationId: string) => {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationMessages(conversationId)
  })
}

