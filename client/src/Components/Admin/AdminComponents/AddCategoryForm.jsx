import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useCategories } from "../../../Hooks/useCategories";
import { useEffect, useState } from "react";

export default function AddCategoryForm({ setOpenForm }) {
  const { addCategory } = useCategories();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const handleSubmit = () => {
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
          <Typography>Add CATEGORY</Typography>
          <TextField
            label="Name"
            required
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <TextField
            label="Description"
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleSubmit()}>
            Add
          </Button>
        </Paper>
      </Container>
    </>
  );
}
