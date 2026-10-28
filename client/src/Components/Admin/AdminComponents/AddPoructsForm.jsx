import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useProducts } from "../../../Hooks/useProducts";

export default function AddProductsForm({ setOpenAddForm }) {
  const { addProduct } = useProducts();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    catId: "",
    image: "",
  });
  const handleAdd = () => {
    addProduct(product);
    setOpenAddForm(false);
  };
  return (
    <>
      <Container sx={{ my: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            p: 3,
          }}
        >
          <TextField
            label="Name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <TextField
            label="Descirpiotn"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <TextField
            label="Category"
            onChange={(e) => setProduct({ ...product, catId: e.target.value })}
          />
          <TextField
            label="Stock"
            type="number"
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <TextField
            label="Image"
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <Button variant="contained" onClick={() => handleAdd()}>
            Add
          </Button>
        </Paper>
      </Container>
    </>
  );
}
