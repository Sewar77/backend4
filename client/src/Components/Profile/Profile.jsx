import { Button, Container, Paper, Typography } from "@mui/material";
import { useAuth } from "../../Hooks/useAuth";
import { useEffect } from "react";

export default function Profile() {
  const { authMe, me } = useAuth();
  useEffect(() => {
    authMe();
  }, []);
  return (
    <>
      <Container sx={{ my: "auto", m: 2 }}>
        <Paper
          elevation={4}
          sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3, m: 3 }}
        >
          <Typography variant="h3">Name: {me.name}</Typography>
          <Typography variant="h3">Email: {me.email}</Typography>
          <Typography variant="h3">Role: {me.role}</Typography>
          <Button variant="contained">change data</Button>
        </Paper>
      </Container>
    </>
  );
}
