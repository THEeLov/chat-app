import axios from "axios";
import { Conversation, ConversationCreate } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-backend-q3h4.onrender.com/api/conversations",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
