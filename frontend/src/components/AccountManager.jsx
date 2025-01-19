import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import api from "../api"; // Import the API utility
import { useAuth } from "../context/AuthContext";

const AccountManager = ({ accounts, setAccounts }) => {
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const { user } = useAuth();

  const addAccount = async (name, balance) => {
    try {
      const response = await api.post(
        "/accounts",
        { name, balance },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAccounts([...accounts, response.data]);
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

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
      {accounts.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="body1">Existing Accounts:</Typography>
          <ul>
            {accounts.map((account) => (
              <li key={account._id}>
                {account.name} -{" "}
                {new Intl.NumberFormat("en-US").format(Number(account.balance))}
                Rwf
              </li>
            ))}
          </ul>
        </Grid>
      )}
    </Grid>
  );
};

export default AccountManager;
