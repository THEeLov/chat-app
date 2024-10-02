import useLocalStorageState from "use-local-storage-state";
import { useCallback } from "react";
import { User, SignInData } from "../types";

const AUTH_DATA_STORAGE_KEY = "authData";
const AUTH_DATA_DEFAULT = null;

const useAuthData = () => {
  const [user, setUserData] = useLocalStorageState<User | null>(
    AUTH_DATA_STORAGE_KEY,
    {
      defaultValue: AUTH_DATA_DEFAULT,
    }
  );
  const [token, setToken] = useLocalStorageState<string | null>("token", {
    defaultValue: null,
  });

  const signIn = (data: SignInData) => {
    setUserData(data.user);
    setToken(data.authToken);
  };

  const signUp = (data: SignInData) => {
    setUserData(data.user);
    setToken(data.authToken);
  }

  const signOut = useCallback(() => {
    setUserData(AUTH_DATA_DEFAULT);
  }, [setUserData]);

  return {
    user,
    token,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuthData;
