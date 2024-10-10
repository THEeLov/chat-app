import axios from "axios";
import { SendMessageSchemaType } from "../validationSchemas/forms";
import { Message } from "../types";
import { attachAuthHeader } from "../utils/attachAuthHeader";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-backend-q3h4.onrender.com/api/messages",
});

attachAuthHeader(axiosInstance);

export const sendMessage = async (
  message: SendMessageSchemaType,
  receiverId: string,
): Promise<Message> => {
  const response = await axiosInstance.post(`/send/${receiverId}`, message);
  return response.data;
};
