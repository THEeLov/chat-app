import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import BackgroundImage from "../assets/pikachu-4k-ai-1920x1080.jpg";

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Image Layer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          filter: "blur(12px)",
          transform: "scale(1.05)",
        }}
      />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
