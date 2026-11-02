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
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";
import { useCategories } from "../../../../Hooks/useCategories";
import AddCategoryForm from "../../AdminComponents/AddCategoryForm";
export default function DisplayCategories() {
  const { categories, deleteCategory, updateCategory } = useCategories();
  const [openModal, setOpenModal] = useState(false);

  const [catId, setCatId] = useState(null);

  //state to open add form
  const [openForm, setOpenForm] = useState(false);

  // state to store the id
  const [catIdUpdate, setCatIdUpdate] = useState(null);
  // state to store the new data
  const [updatedCategory, setUpdatedCategory] = useState({
    name: "",
    description: "", //the old or the new
  });
  console.log(updatedCategory);

  const handleSaveEdit = () => {
    updateCategory(catIdUpdate, updatedCategory);
    setCatIdUpdate(null);
  };
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
          <Button variant="contained" onClick={() => setOpenForm(!openForm)}>
            {openForm ? "Cancel" : "Add Category"}
          </Button>
        </Box>
        <Divider sx={{ p: 3 }}>Manage</Divider>
        {openForm && <AddCategoryForm setOpenForm={setOpenForm} />}
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
                    <TableCell>
                      {catIdUpdate === cat._id ? (
                        <TextField
                          label="Name"
                          value={updatedCategory.name}
                          onChange={(e) =>
                            setUpdatedCategory({
                              ...updatedCategory,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        cat.name
                      )}
                    </TableCell>
                    <TableCell>
                      {catIdUpdate === cat._id ? (
                        <TextField
                          label="description"
                          value={updatedCategory.description}
                          onChange={(e) =>
                            setUpdatedCategory({
                              ...updatedCategory,
                              description: e.target.value,
                            })
                          }
                        />
                      ) : (
                        cat.description
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(cat.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {catIdUpdate === cat._id ? (
                        <>
                          <Button onClick={() => handleSaveEdit()}>Save</Button>
                          <Button onClick={() => setCatIdUpdate(null)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => (
                              setCatIdUpdate(cat._id),
                              setUpdatedCategory({
                                name: cat.name, //save the old
                                description: cat.description, //the old
                              })
                            )}
                          >
                            Edit
                          </Button>
                        </>
                      )}
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
