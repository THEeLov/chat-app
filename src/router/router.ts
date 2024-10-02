import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import React from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        element: React.createElement(Navigate, {
          to: "/sign-in",
          replace: true,
        }),
      },
      { path: "/sign-in", Component: SignIn },
      { path: "/sign-up", Component: SignUp },
    ],
  },
]);
