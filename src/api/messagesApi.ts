import axios from "axios";
import { SendMessageSchemaType } from "../validationSchemas/forms";
import { Message } from "../types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/messages",
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
  }
);

export const sendMessage = async (
  message: SendMessageSchemaType,
  receiverId: string
): Promise<Message> => {
  const response = await axiosInstance.post(`/send/${receiverId}`, message);
  return response.data;
};
