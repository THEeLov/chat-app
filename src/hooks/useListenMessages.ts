import { useEffect, useState } from "react";
import { Conversation, Message } from "../types";
import { useSocket } from "./useSocket";

export const useListenMessages = (conversation: Conversation | undefined) => {
  const [messages, setMessages] = useState(conversation?.messages || []);
  const { socket } = useSocket();

  // Update messages when conversation changes
  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    if (socket) {
      // Listen for new messages from the socket
      socket.on("newMessage", (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Cleanup socket listener on unmount
      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket]);

  return { messages };
};
