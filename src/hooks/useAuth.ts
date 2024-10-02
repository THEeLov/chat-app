import { useMutation } from "@tanstack/react-query"

import { SignInUser, SignUpUser } from "../models/auth"
import { signInUser, signUpUser } from "../api/authApi"

export const useSignIn = () => {
  return useMutation({
    mutationFn: (payload: SignInUser) => signInUser(payload)
  })
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: (payload: SignUpUser) => signUpUser(payload)
  })
}