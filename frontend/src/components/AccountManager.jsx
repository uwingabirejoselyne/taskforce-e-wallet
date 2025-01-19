// components/AccountManager.jsx
import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const AccountManager = ({ accounts, addAccount }) => {
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const handleAddAccount = () => {
    if (accountName && initialBalance) {
      addAccount(accountName, parseFloat(initialBalance));
      setAccountName("");
      setInitialBalance("");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Manage Accounts</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Account Name"
          fullWidth
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Initial Balance"
          type="number"
          fullWidth
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddAccount}>
          Add Account
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">Existing Accounts:</Typography>
        <ul>
          {Object.keys(accounts).map((account, index) => (
            <li key={index}>
              {account} - ${accounts[account]}
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default AccountManager;
