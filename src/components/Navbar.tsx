import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import useAuthData from "../hooks/useAuthData";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user } = useAuthData();

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
      >
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ElectricBoltIcon sx={{color: "#f2e146"}}/>
          <Typography
            variant="h6"
            noWrap
            sx={{
              ml: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#f2e045",
              textDecoration: "none",
              userSelect: "none"
            }}
          >
            BOLT CHAT
          </Typography>
        </Box>

        {/* ACCOUNT */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user && <UserMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
