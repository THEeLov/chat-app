import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);