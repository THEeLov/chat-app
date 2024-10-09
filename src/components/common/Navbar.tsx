import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import NavbarAvatar from "./NavbarAvatar";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
      >
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ElectricBoltIcon sx={{ color: "#f2e146" }} />
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
              userSelect: "none",
            }}
          >
            BOLT
          </Typography>
        </Box>

        {/* Avatar */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NavbarAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
