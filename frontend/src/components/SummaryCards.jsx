import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
} from "@mui/material";

const SummaryCards = ({
  accounts,
  transactions,
  totalIncome,
  totalExpense,
}) => {
  const budget = 5000; // Sample budget
  const incomePercentage = (totalIncome / budget) * 100;
  const expensePercentage = (totalExpense / budget) * 100;

  return (
    <Grid container spacing={3}>
      {/* Account Status Cards */}
      {Object.keys(accounts).map((account) => (
        <Grid item xs={12} sm={6} md={4} key={account}>
          <Card>
            <CardContent>
              <Typography variant="h6">{account}</Typography>
              <Typography variant="h5">${accounts[account]}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {/* Budget Progress Cards */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h5">${totalIncome}</Typography>
            <LinearProgress variant="determinate" value={incomePercentage} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h5">${totalExpense}</Typography>
            <LinearProgress variant="determinate" value={expensePercentage} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
