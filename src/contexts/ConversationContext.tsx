import React, { createContext, useState } from "react";

  export interface ConversationContextType {
    openConversationId: string | null;
    receiverId: string | null;
    handleChatSwap: (conversationId: string, receiverId: string) => void
  }

  export const ConversationContext = createContext<ConversationContextType | undefined>(
    undefined,
  );

  export const ConversationContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    
    const [openConversationId, setOpenConversationId] = useState<string | null>(null);
    const [receiverId, setReceiverId] = useState<string | null>(null);
    
    const handleChatSwap = (conversationId: string, receiverId: string) => {
      setOpenConversationId(conversationId);
      setReceiverId(receiverId);
    }

    return (
      <ConversationContext.Provider value={{openConversationId, receiverId, handleChatSwap }}>
        {children}
      </ConversationContext.Provider>
    );
  };
