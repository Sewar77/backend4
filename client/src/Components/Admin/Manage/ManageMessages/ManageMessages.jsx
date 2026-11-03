import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMessages } from "../../../../Hooks/useMessages";
import { useEffect } from "react";
export default function ManageMessages() {
  const { getAllMessages, messages, updateMessageStatus } = useMessages();
  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h3">Manage Users FeeDBACK</Typography>
        <TableContainer sx={{ overflowX: "scroll", minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Createdat</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg, idx) => {
                return (
                  <TableRow key={msg._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{msg.fullName}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.message}</TableCell>
                    <TableCell>{msg.status}</TableCell>
                    <TableCell>
                      {new Date(msg.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => updateMessageStatus(msg._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => updateMessageStatus(msg._id, "rejected")}
                      >
                        Rejecte
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => updateMessageStatus(msg._id, "pending")}
                      >
                        Pending
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
