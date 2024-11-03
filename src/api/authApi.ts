import axios from "axios";

import { SignInUser, SignUpUser } from "../models/auth";
import { SignInData } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://chat-app-backend-production-daf6.up.railway.app/api/auth",
});

export const signInUser = async (data: SignInUser): Promise<SignInData> => {
  const resp = await axiosInstance.post("/signin", data);
  return resp.data;
};

export const signUpUser = async (data: SignUpUser): Promise<SignInData> => {
  const resp = await axiosInstance.post("/signup", data);
  return resp.data;
};
