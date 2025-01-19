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
import api from "../api";
import { useAuth } from "../context/AuthContext";

const TransactionForm = ({ categories, accounts }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      if (
        description !== "" &&
        amount !== "" &&
        category !== "" &&
        account !== ""
      ) {
        // Add transaction
        const response = await api.post(
          "/transactions",
          {
            description,
            amount: parseFloat(amount),
            type,
            category: categories.find((cat) => cat._id === category).name,
            categoryId: category,
            accountId: account,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.status !== 201) {
          alert("Transaction adding failed");
          return;
        }

        // Reset form after submission
        setDescription("");
        setAmount("");
        setCategory("");
        alert("Transaction added successfully");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
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
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Account</InputLabel>
          <Select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            label="Account"
          >
            {accounts.map((account) => (
              <MenuItem key={account._id} value={account._id}>
                {account.name} - {account.balance} Rwf
              </MenuItem>
            ))}
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
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
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
