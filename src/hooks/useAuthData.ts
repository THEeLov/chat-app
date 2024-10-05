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
    },
  );

  const signIn = (data: SignInData) => {
    setUserData(data.user);
    localStorage.setItem("token", data.authToken);
  };

  const signUp = (data: SignInData) => {
    setUserData(data.user);
    localStorage.setItem("token", data.authToken);
  };

  const signOut = useCallback(() => {
    setUserData(AUTH_DATA_DEFAULT);
    localStorage.removeItem("token");
  }, [setUserData]);

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuthData;
