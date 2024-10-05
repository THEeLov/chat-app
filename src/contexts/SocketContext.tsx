import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAuthData from "../hooks/useAuthData";

export interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[] | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>(null);
  const { user } = useAuthData();

  useEffect(() => {
    if (user) {
      const socketInstance = io("http://localhost:3000", {
        query: { userId: user._id },
      });

      setSocket(socketInstance);
      socketInstance.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
