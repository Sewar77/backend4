import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { login, logout } = useAuth();
  const handleSubmit = () => {
    login(userData);
  };
  return (
    <>
      <Container sx={{ my: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            p: 3,
          }}
        >
          <Typography variant="h3">Sign in</Typography>
          <TextField
            label="Email"
            type="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleSubmit()}>
            Sigin
          </Button>
          <Typography>
            Already have account?{" "}
            <Button onClick={() => navigate("/register")}>Register</Button>
            <Button onClick={() => logout()}>Logout</Button>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
