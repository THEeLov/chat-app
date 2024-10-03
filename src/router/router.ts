import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import React from "react";
import Chats from "../pages/Chats";
import ProtectedRouteLayout from "../layouts/ProtectedRouteLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        element: React.createElement(Navigate, {
          to: "/signin",
          replace: true,
        }),
      },
      { path: "/signin", Component: SignIn },
      { path: "/signup", Component: SignUp },
      {
        path: "/chats",
        Component: ProtectedRouteLayout,
        children: [{ path: "", Component: Chats }],
      },
    ],
  },
]);
