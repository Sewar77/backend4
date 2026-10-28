import {
  AppBar,
  Box,
  Menu,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> ea1de0a98934247aa3af4f0f99b052720efc4470
export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            p: 3,
            bgcolor: "#F1DDCF",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h2">Logo</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
<<<<<<< HEAD
            <IconButton>Home</IconButton>
            <IconButton>Products</IconButton>
=======
            <IconButton onClick={() => navigate("/")}>Home</IconButton>
            <IconButton onClick={() => navigate("/products")}>
              Products
            </IconButton>
>>>>>>> ea1de0a98934247aa3af4f0f99b052720efc4470
            <IconButton onClick={() => navigate("/login")}>Login</IconButton>
            <IconButton onClick={() => navigate("/register")}>
              Register
            </IconButton>
            <IconButton>About</IconButton>
            <IconButton>Contact</IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
