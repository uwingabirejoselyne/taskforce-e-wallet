import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const TransactionForm = ({ addTransaction, categories, subcategories }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleSubmit = () => {
    if (description && amount && category && subcategory) {
      addTransaction({
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type,
        category,
        subcategory,
        date: new Date().toLocaleDateString(),
      });
      // Reset form after submission
      setDescription("");
      setAmount("");
      setCategory("");
      setSubcategory("");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Amount"
          fullWidth
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            label="Subcategory"
          >
            {subcategories
              .filter((sub) => sub.category === category)
              .map((sub) => (
                <MenuItem key={sub.subcategory} value={sub.subcategory}>
                  {sub.subcategory}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransactionForm;
