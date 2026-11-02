import { Button, Container, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useCategories } from "../../../Hooks/useCategories";

export default function AddCategoryForm({ setOpenForm }) {
  const { addCategory } = useCategories();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const handleAdd = () => {
    addCategory(category);
    setOpenForm(false);
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
            required
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <TextField
            label="Descirpiotn"
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
          />

          <Button variant="contained" onClick={() => handleAdd()}>
            Add
          </Button>
        </Paper>
      </Container>
    </>
  );
}
