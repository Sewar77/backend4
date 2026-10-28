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
import { useProducts } from "../../../../Hooks/useProducts";
import { useState } from "react";
import ConfirmDeleteModal from "../../AdminComponents/ConfirmDeleteModal";
import AddProductsForm from "../../AdminComponents/AddPoructsForm";
export default function DisplayProducts() {
  const { products, deleteProduct } = useProducts();
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
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
                      <Button variant="contained" color="warning">
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
        setProductId={setProductId}
        productId={productId}
        deleteProduct={deleteProduct}
      />
    </>
  );
}
