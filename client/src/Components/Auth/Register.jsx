import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(userData);
  const { register } = useAuth();
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
          <Typography variant="h2">Create Account</Typography>
          <TextField
            label="Enter Your Name"
            required
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
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
          <TextField
            label="Enter Your Confirm Password"
            type="password"
            required
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => register(userData)}>
            Register
          </Button>
        </Paper>
      </Container>
    </>
  );
}
