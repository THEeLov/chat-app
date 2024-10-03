import axios from "axios";
import { Conversation } from "../types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/conversations",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserConversations = async (
  userId: string
): Promise<Conversation[]> => {
  const resp = await axiosInstance.post(`/${userId}`);
  return resp.data;
};
