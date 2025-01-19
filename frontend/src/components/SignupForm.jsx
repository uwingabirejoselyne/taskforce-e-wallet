import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSignup = () => {
    // Simple user creation (in real app, you would use an API to store user)
    const newUser = { email, name: email.split("@")[0] };
    localStorage.setItem("user", JSON.stringify(newUser));
    login(newUser);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
