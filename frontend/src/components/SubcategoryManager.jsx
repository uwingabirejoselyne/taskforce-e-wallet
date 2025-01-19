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

const SubcategoryManager = ({ categories, subcategories, addSubcategory }) => {
  const [parentCategory, setParentCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleAddSubcategory = () => {
    if (parentCategory && subcategory) {
      addSubcategory(parentCategory, subcategory);
      setSubcategory("");
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6">Manage Subcategories</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Parent Category</InputLabel>
        <Select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          {Object.values(categories)
            .flat()
            .map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label="Subcategory"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSubcategory}
      >
        Add Subcategory
      </Button>
    </Box>
  );
};

export default SubcategoryManager;
