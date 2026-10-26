import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useState } from "react";
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = () => {
    register(userData);
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
          <Typography variant="h3">Sign up</Typography>
          <TextField
            label="Name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

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
          <TextField
            label="Confirm Password"
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleSubmit()}>
            Sigin
          </Button>
          <Typography>
            Dont have account?{" "}
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
