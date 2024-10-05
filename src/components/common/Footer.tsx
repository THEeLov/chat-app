import { Box, Divider, IconButton, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Divider
        sx={{
          width: "95%",
        }}
      />

      <Typography variant="h6" marginTop="10px">
        © {new Date().getFullYear()} BOLT CHAT
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="facebook"
          component="a"
          href="https://www.linkedin.com/in/filip-kozik-81b695303/"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="twitter"
          component="a"
          href="https://github.com/THEeLov"
        >
          <GitHub />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
