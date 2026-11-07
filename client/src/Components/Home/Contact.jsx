import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Header from "../Shared/Header";
import { useMessages } from "../../Hooks/useMessages";
import { useState } from "react";
export default function Contact() {
  const { createMessages } = useMessages();
  const [message, setMessage] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const handleSubmit = () => {
    createMessages(message);
    setMessage({
      fullName: "",
      email: "",
      message: "",
    });
  };
  return (
    <>
      <Header />
      <Container sx={{ my: "auto" }}>
        <Paper
          elevation={4}
          sx={{ display: "flex", flexDirection: "column", gap: 4, p: 3 }}
        >
          <Typography variant="h4">Leave feedback!</Typography>
          <TextField
            label="Full name"
            value={message.fullName}
            onChange={(e) =>
              setMessage({ ...message, fullName: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={message.email}
            type="email"
            onChange={(e) => setMessage({ ...message, email: e.target.value })}
          />
          <TextField
            label="Message"
            multiline
            minRows={4}
            value={message.message}
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleSubmit()}>
            Send Message
          </Button>
        </Paper>
      </Container>
    </>
  );
}
