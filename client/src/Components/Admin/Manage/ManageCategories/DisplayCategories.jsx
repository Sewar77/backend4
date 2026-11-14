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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";
import { useCategories } from "../../../../Hooks/useCategories";
import AddCategoryForm from "../../AdminComponents/AddCategoryForm";
import { useTrader } from "../../../../Hooks/useTrader";
import { useEffect } from "react";
import { useAuth } from "../../../../Hooks/useAuth";
export default function DisplayCategories() {
  const {
    categories,
    deleteCategory,
    updateCategory,
    getAllCategories,
    updateCategoryStatus,
  } = useCategories();
  const [openModal, setOpenModal] = useState(false);
  const { getTraderCategories, categoriesTrader } = useTrader();
  const [catId, setCatId] = useState(null);

  const { currentUser } = useAuth();
  console.log(currentUser);
  //state to open add form
  const [openForm, setOpenForm] = useState(false);

  // state to store the id
  const [catIdUpdate, setCatIdUpdate] = useState(null);
  // state to store the new data
  const [updatedCategory, setUpdatedCategory] = useState({
    name: "",
    description: "", //the old or the new
  });
  const handleSaveEdit = () => {
    updateCategory(catIdUpdate, updatedCategory);
    setCatIdUpdate(null);
  };
  let mappingCategories = [];

  if (currentUser.role === "admin") {
    useEffect(() => {
      getAllCategories();
    }, []);
    mappingCategories = [...categories];
  } else {
    useEffect(() => {
      getTraderCategories();
    }, []);
    mappingCategories = [...categoriesTrader];
  }
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
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mappingCategories.map((cat, idx) => {
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
                    <TableCell>{cat.status}</TableCell>
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
                      {currentUser.role === "admin" && (
                        <>
                          <Button
                            onClick={() =>
                              updateCategoryStatus(cat._id, "rejected")
                            }
                          >
                            <ThumbDownAltIcon />
                          </Button>
                          <Button
                            onClick={() =>
                              updateCategoryStatus(cat._id, "approved")
                            }
                          >
                            <ThumbUpIcon />
                          </Button>
                        </>
                      )}
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
