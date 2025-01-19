import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    // Validate credentials (simple example)
    if (email === "test@example.com" && password === "password123") {
      login({ email, name: "John Doe" });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Login
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
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>

      <Typography variant="body" gutterBottom>
        Have no account? <Link href="/signup">Sign Up Here</Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
