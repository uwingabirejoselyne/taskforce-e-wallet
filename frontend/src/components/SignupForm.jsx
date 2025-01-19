import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSignup = async () => {
    // Simple user creation (in real app, you would use an API to store user)
    const response = await api.get("/user/register");
    localStorage.setItem("user", JSON.stringify(newUser));
    login(newUser);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Mobile Number"
        type="text"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
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

      <Typography variant="body" gutterBottom>
        Have account already? <Link href="/">Login Here</Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
