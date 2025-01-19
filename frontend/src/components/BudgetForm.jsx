import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { user } = useAuth();

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleBudget = async () => {
    try {
      const response = await api.post(
        "/budget/set",
        { budget },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status !== 200) {
        alert("Budget setting failed");
        return;
      }

      alert("Budget set successfully");
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Set Your Budget
      </Typography>
      <TextField
        type="number"
        label="Budget Amount"
        value={budget}
        onChange={handleBudgetChange}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleBudget}>
        Save Budget
      </Button>
    </Box>
  );
};

export default BudgetForm;
