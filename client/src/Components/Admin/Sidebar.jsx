import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          overflowY: "scroll",
          position: "static",
          bgcolor: "#F1DDCF",
          width: "300px",
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontSize: "25px",
          }}
        >
          <ListItemButton
            onClick={() => navigate(`/${currentUser.role}/dashboard`)}
          >
            Dashboard
          </ListItemButton>
          {currentUser && currentUser.role === "admin" && (
            <ListItemButton onClick={() => navigate("/admin/manage-users")}>
              Manage User
            </ListItemButton>
          )}
          <ListItemButton
            onClick={() => navigate(`/${currentUser.role}/manage-products`)}
          >
            Manage Profucts
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate(`/${currentUser.role}/manage-categories`)}
          >
            Manage Categories
          </ListItemButton>
          {currentUser && currentUser.role === "admin" && (
            <ListItemButton onClick={() => navigate("/admin/manage-messages")}>
              Manage Messages
            </ListItemButton>
          )}
          <ListItemButton>Manage Profile</ListItemButton>
          <ListItemButton
            onClick={() => navigate(`/${currentUser.role}/change-password`)}
          >
            Change Password
          </ListItemButton>
          <ListItemButton onClick={() => logout()}>Logout</ListItemButton>
        </List>
      </Box>
    </>
  );
}
