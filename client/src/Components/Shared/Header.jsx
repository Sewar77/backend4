import {
  AppBar,
  Box,
  Menu,
  IconButton,
  Toolbar,
  Typography,
  List,
  Button,
  ListItem,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  console.log(currentUser);
  return (
    <>
      <AppBar position="relative">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            p: 1,
            bgcolor: "#F1DDCF",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h2">
            <Box
              component={"img"}
              src="icon.jpg"
              sx={{
                width: "60%",
                height: "40%",
                borderRadius: 5,
                cursor: "pointer",
              }}
            />
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <IconButton onClick={() => navigate("/")}>Home</IconButton>

            {Object.keys(currentUser).length !== 0 &&
              currentUser.role !== "user" && (
                <IconButton
                  onClick={() => navigate(`/${currentUser.role}/dashboard`)}
                >
                  Dashboard
                </IconButton>
              )}
            {Object.keys(currentUser).length !== 0 && (
              <IconButton onClick={() => navigate(`/cart`)}>Cart</IconButton>
            )}

            <IconButton onClick={() => navigate("/products")}>
              Products
            </IconButton>
            {Object.keys(currentUser).length !== 0 ? (
              <IconButton onClick={() => logout()}>Logout</IconButton>
            ) : (
              <>
                <IconButton onClick={() => navigate("/login")}>
                  Login
                </IconButton>
                <IconButton onClick={() => navigate("/register")}>
                  Register
                </IconButton>
              </>
            )}
            <Button onClick={() => setOpen(!open)}>
              <Tooltip title="Menu Items">
                <MenuIcon />
              </Tooltip>
            </Button>
            {open && (
              <List
                sx={{
                  position: "absolute",

                  bgcolor: "#F1DDCF",
                  color: "black",
                  top: 80,
                  right: 30,
                }}
              >
                <ListItem>About</ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/contact")}>
                    Contact
                  </ListItemButton>
                </ListItem>
                {currentUser !== null && (
                  <ListItem>
                    <ListItemButton
                      onClick={() => navigate("/change-password")}
                    >
                      actions
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem>AI</ListItem>
                <ListItem>Future</ListItem>
                <ListItem>Future</ListItem>
                <ListItem>Future</ListItem>
                <ListItem>Future</ListItem>
                <ListItem>Future</ListItem>
                <ListItem>Future</ListItem>
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
