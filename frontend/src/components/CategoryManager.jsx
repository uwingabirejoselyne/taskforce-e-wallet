import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const CategoryManager = ({ categories, setCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const { user } = useAuth();

  const handleAddCategory = async () => {
    try {
      const response = await api.post(
        "/category",
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status !== 201) {
        alert("Category adding failed");
        return;
      }

      setCategories([...categories, response.data?.category]);

      alert("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6">Manage Categories</Typography>
      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddCategory}>
        Add Category
      </Button>
      {categories.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="body1">Existing Categories:</Typography>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        </Grid>
      )}
    </Box>
  );
};

export default CategoryManager;
