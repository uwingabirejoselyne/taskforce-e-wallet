import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const CategoryManager = ({ categories, addCategory }) => {
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleAddCategory = () => {
    addCategory(type, category, subcategory || null);
    setCategory("");
    setSubcategory("");
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6">Manage Categories</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Subcategory (Optional)"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddCategory}>
        Add Category
      </Button>
    </Box>
  );
};

export default CategoryManager;
