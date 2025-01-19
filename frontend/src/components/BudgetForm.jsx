import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const BudgetForm = ({ budget, setBudget }) => {
  const handleBudgetChange = (e) => {
    setBudget(parseFloat(e.target.value) || 0);
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert("Budget Set!")}
      >
        Save Budget
      </Button>
    </Box>
  );
};

export default BudgetForm;
