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
import { useProducts } from "../../../../Hooks/useProducts";
import { useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";
import AddProductsForm from "../../AdminComponents/AddPoructsForm";
import { useCategories } from "../../../../Hooks/useCategories";
export default function DisplayProducts() {
  const { products, deleteProduct, editProduct } = useProducts();
  const { categories } = useCategories();
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [updatePorduct, setUpdateProduct] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    catId: "",
    image: "",
  });
  const handleUpdate = () => {
    console.log(updatePorduct);
    editProduct(editedId, updatePorduct);
    setOpenEditModal(false);
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
          <Typography variant="h3">Manage Products</Typography>
          <Button
            variant="contained"
            onClick={() => setOpenAddForm(!openAddForm)}
          >
            {openAddForm ? "Cancel" : "Add Product"}
          </Button>
        </Box>
        <Divider sx={{ p: 3 }}>Manage</Divider>
        {openAddForm && <AddProductsForm setOpenAddForm={setOpenAddForm} />}
        <TableContainer sx={{ overflowX: "scroll", minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((prod, idx) => {
                return (
                  <TableRow key={prod._id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{prod.name}</TableCell>
                    <TableCell>{prod.description || "-----"}</TableCell>
                    <TableCell>{prod?.catId?.name || "------"}</TableCell>
                    <TableCell>{prod.stock}</TableCell>
                    <TableCell>{prod.price}</TableCell>
                    <TableCell>
                      {new Date(prod.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{prod.image || "-----"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => (
                          setOpenEditModal(true),
                          setUpdateProduct({
                            name: prod.name,
                            description: prod.description,
                            stock: prod.stock,
                            price: prod.price,
                            catId: prod.catId._id,
                            image: prod.image,
                          }),
                          setEditedId(prod._id)
                        )}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => (
                          setOpenModal(true),
                          setProductId(prod._id)
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
        setId={setProductId}
        id={productId}
        deleteItem={deleteProduct}
      />
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
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
            Edit Product
          </Typography>
          <TextField
            label="Name"
            value={updatePorduct.name}
            onChange={(e) =>
              setUpdateProduct({ ...updatePorduct, name: e.target.value })
            }
          />
          <TextField
            label="Descirpiotn"
            value={updatePorduct.description}
            onChange={(e) =>
              setUpdateProduct({
                ...updatePorduct,
                description: e.target.value,
              })
            }
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={updatePorduct.catId}
              onChange={(e) =>
                setUpdateProduct({ ...updatePorduct, catId: e.target.value })
              }
            >
              {categories.map((cat) => {
                return (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            label="Stock"
            type="number"
            value={updatePorduct.stock}
            onChange={(e) =>
              setUpdateProduct({ ...updatePorduct, stock: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={updatePorduct.price}
            onChange={(e) =>
              setUpdateProduct({ ...updatePorduct, price: e.target.value })
            }
          />
          <TextField
            label="Image"
            value={updatePorduct.image}
            onChange={(e) =>
              setUpdateProduct({ ...updatePorduct, image: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleUpdate()}>
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
