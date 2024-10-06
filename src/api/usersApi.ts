import axios from "axios";
import { User } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-backend-q3h4.onrender.com/api/users",
});

export const getUsers = async (data: string | undefined): Promise<User[]> => {
  if (data === undefined) {
    return [];
  }
  const resp = await axiosInstance.get(`/search?email=${data}`);
  return resp.data;
};
