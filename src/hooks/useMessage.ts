import { useMutation } from "@tanstack/react-query"
import { SendMessageSchemaType } from "../validationSchemas/forms"
import { sendMessage } from "../api/messagesApi"

export const useSendMessage = (receiverId: string) => {
  return useMutation({
    mutationFn: (message: SendMessageSchemaType) => sendMessage(message, receiverId)
  })
}