import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">Name: {user?.name}</Typography>
      <Typography variant="body1">Email: {user?.email}</Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default ProfilePage;
