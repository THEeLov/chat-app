import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router/router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SocketContextProvider } from "./contexts/SocketContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <SocketContextProvider>
          <RouterProvider router={router} />
        </SocketContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
