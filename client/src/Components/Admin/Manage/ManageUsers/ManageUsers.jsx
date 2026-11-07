import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useUsers } from "../../../../Hooks/useUsers";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";

export default function ManageUsers() {
  const { getAllUsers, users, deleteUser } = useUsers();
  useEffect(() => {
    getAllUsers(); // particualtly
  }, []); //call the function under effect
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography>Manage Users</Typography>
        <Divider>Mnage users</Divider>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Registered At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => {
                return (
                  <TableRow key={user._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Button>Edit</Button>
                      <Button
                        onClick={() => (
                          setOpenModal(true),
                          setUserId(user._id)
                        )}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConfirmDeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setId={setUserId}
        id={userId}
        deleteItem={deleteUser}
      />
    </>
  );
}
