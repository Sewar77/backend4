import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import Header from "./Header";
import { useState } from "react";
import { useUsers } from "../../Hooks/useUsers";
export default function ChangePassword() {
  const { currentUser } = useAuth();
  const { changeUserPassword } = useUsers();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleChangePassword = () => {
    changeUserPassword(
      password.oldPassword,
      password.newPassword,
      password.confirmNewPassword,
    );
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };
  return (
    <>
      {currentUser.role === "user" && <Header />}
      <Container sx={{ m: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Typography variant="h3">Change Password</Typography>
          <TextField
            label="Old Password"
            type="password"
            value={password.oldPassword}
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
          />
          <TextField
            label="New Password"
            type="password"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={password.confirmNewPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmNewPassword: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleChangePassword()}>
            Change
          </Button>
        </Paper>
      </Container>
    </>
  );
}
