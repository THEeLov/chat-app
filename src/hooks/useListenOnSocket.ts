import { useEffect, useState } from "react";
import { Conversation, Message } from "../types";
import { useSocketContext } from "./contexts/useSocket";

export const useListenMessages = (conversation: Conversation | undefined) => {
  const [messages, setMessages] = useState(conversation?.messages || []);
  const { socket } = useSocketContext();

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

export const useListenConversations = (conv: Conversation[] | undefined) => {
  const [conversations, setConversations] = useState<Conversation[]>(
    conv || [],
  );
  const { socket } = useSocketContext();

  useEffect(() => {
    if (conv) {
      setConversations(conv);
    }
  }, [conv]);

  useEffect(() => {
    if (socket) {
      // Listen for new conversations from the socket
      socket.on("newContact", (newConversation: Conversation) => {
        // Add new conversation to the existing ones
        setConversations((prevConversations) => [
          ...prevConversations,
          newConversation,
        ]);
      });

      // Cleanup socket listener on unmount
      return () => {
        socket.off("newContact");
      };
    }
  }, [socket]);

  return { conversations };
};
