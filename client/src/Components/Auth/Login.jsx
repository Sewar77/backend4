import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  return (
    <>
      <Container sx={{ m: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 3,
          }}
        >
          <Typography variant="h2">Login to your account</Typography>
          <TextField
            label="Enter Your Email"
            type="email"
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextField
            label="Enter Your Password"
            type="password"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => login(userData)}>
            Login
          </Button>
        </Paper>
      </Container>
    </>
  );
}
