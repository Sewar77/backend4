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
export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log(open);
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
            <IconButton onClick={() => navigate("/products")}>
              Products
            </IconButton>
            <IconButton onClick={() => navigate("/login")}>Login</IconButton>
            <IconButton onClick={() => navigate("/register")}>
              Register
            </IconButton>
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
                  <ListItemButton onClick={() => navigate("/")}>
                    Contact
                  </ListItemButton>
                </ListItem>
                <ListItem>Careers</ListItem>
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
