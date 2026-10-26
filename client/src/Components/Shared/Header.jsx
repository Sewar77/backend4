import {
  AppBar,
  Box,
  Menu,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            p: 3,
            bgcolor: "violet",
          }}
        >
          <Typography variant="h2">Logo</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <IconButton>Home</IconButton>
            <IconButton>Products</IconButton>
            <IconButton>Login</IconButton>
            <IconButton>Register</IconButton>
            <IconButton>About</IconButton>
            <IconButton>Contact</IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
