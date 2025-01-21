import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api.js";
import { Link } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      setLoading(false);

      if (response.status !== 200) {
        alert("Login failed");
        return;
      }

      login(response.data);
    } catch (error) {
      setLoading(false);
      alert("Login failed");
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
      <Button variant="contained" color="primary" onClick={handleLogin}
        disabled={loading}>
        {loading ? "Wait..." : "Login"}
      </Button>

      <Typography variant="body" gutterBottom>
        Have no account? <Link to="/signup">Sign Up Here</Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
