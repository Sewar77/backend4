import {
  AppBar,
  Box,
  Menu,
  IconButton,
  Toolbar,
  Typography,
  Card,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import Header from "../Shared/Header";
import { useMessages } from "../../Hooks/useMessages";

export default function Home() {
  const { approveMessages } = useMessages();
  return (
    <>
      <Header />
      <Typography>Welcome our store</Typography>
      <Container sx={{ my: "auto" }}>
        <Typography>cclients feedbacks</Typography>
        <Grid container spacing={4}>
          {approveMessages.map((msg) => {
            return (
              <Grid size={{ sm: 1, md: 3, lg: 6 }} key={msg._id}>
                <Card sx={{ p: 3 }}>
                  <Typography variant="h5">{msg.fullName}</Typography>
                  <Typography variant="body2">{msg.email}</Typography>
                  <Divider>message</Divider>
                  <Typography variant="h4">{msg.message}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
