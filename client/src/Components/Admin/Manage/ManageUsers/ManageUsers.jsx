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
import { useUsers } from "../../../../Hooks/useUsers";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";

export default function ManageUsers() {
  const { getAllUsers, users, deleteUser, editUser } = useUsers();
  useEffect(() => {
    getAllUsers(); // particualtly
  }, []); //call the function under effect
  const [openModal, setOpenModal] = useState(false); //delete
  const [userId, setUserId] = useState(null);

  const [openEditForm, setOpenEditForm] = useState(false); //edit
  const [userEditId, setUserEditId] = useState(null);
  const [newUser, setNewUser] = useState({
    newStatus: "",
    neRole: "",
  });
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
                <TableCell>Status</TableCell>
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
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => (
                          setOpenEditForm(true),
                          setUserEditId(user._id)
                        )}
                      >
                        Edit
                      </Button>
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
      <Modal
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit User Info
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newUser.newStatus}
              onChange={(e) =>
                setNewUser({ ...newUser, newStatus: e.target.value })
              }
              label="Status"
            >
              <MenuItem value="approved">Approve</MenuItem>
              <MenuItem value="rejected">Rejecet</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.neRole}
              onChange={(e) =>
                setNewUser({ ...newUser, neRole: e.target.value })
              }
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="trader">Trader</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => (
              editUser(userEditId, newUser.neRole, newUser.newStatus),
              setOpenEditForm(false)
            )}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
