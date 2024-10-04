import { useQuery } from "@tanstack/react-query"
import { getConversationMessages } from "../api/conversationsApi"

export const useConversationAllMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["conversationAllMessages", conversationId],
    queryFn: () => getConversationMessages(conversationId)
  })
}

