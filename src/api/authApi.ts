import axios from "axios";

import { SignInUser, SignUpUser } from "../models/auth";
import { User } from "../types"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
})

export const signInUser = async (data: SignInUser): Promise<User> => {
  const resp = await axiosInstance.post("/signin", data);
  return resp.data;
}

export const signUpUser = async (data: SignUpUser): Promise<User> => {
  const resp = await axiosInstance.post("/signup", data);
  return resp.data;
}