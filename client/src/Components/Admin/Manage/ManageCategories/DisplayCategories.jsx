import {
  Box,
  Button,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";
import { useCategories } from "../../../../Hooks/useCategories";
export default function DisplayCategories() {
  const { categories, deleteCategory } = useCategories();
  const [openModal, setOpenModal] = useState(false);

  const [catId, setCatId] = useState(null);

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h3">Manage Category</Typography>
          <Button variant="contained">Add Category</Button>
        </Box>
        <Divider sx={{ p: 3 }}>Manage</Divider>

        <TableContainer sx={{ overflowX: "scroll", minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat, idx) => {
                return (
                  <TableRow key={cat._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.description || "-----"}</TableCell>
                    <TableCell>
                      {new Date(cat.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="warning">
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => (setOpenModal(true), setCatId(cat._id))}
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
        setId={setCatId}
        id={catId}
        deleteItem={deleteCategory}
      />
    </>
  );
}
