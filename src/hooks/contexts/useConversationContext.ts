import { useContext } from "react";
import { ConversationContext } from "../../contexts/ConversationContext";

export const useConverstationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("Should not happen");
  }
  return context;
};