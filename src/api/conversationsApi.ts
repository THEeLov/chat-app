import axios from "axios";
import { Conversation, ConversationCreate } from "../types";
import { attachAuthHeader } from "../utils/attachAuthHeader";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-backend-production-daf6.up.railway.app/api/conversations",
});

attachAuthHeader(axiosInstance);

export const getUserConversations = async (
  userId: string,
): Promise<Conversation[]> => {
  const resp = await axiosInstance.get(`/${userId}`);
  return resp.data;
};

export const getConversationMessages = async (
  conversationId: string,
): Promise<Conversation> => {
  const resp = await axiosInstance.get(`/messages/${conversationId}`);
  return resp.data;
};

export const postConversation = async (
  data: ConversationCreate,
): Promise<Conversation> => {
  const resp = await axiosInstance.post("", data);
  return resp.data;
};
