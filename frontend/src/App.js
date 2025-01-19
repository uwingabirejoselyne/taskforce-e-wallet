import React from "react";
import { Container, Avatar, AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfilePage from "./components/ProfilePage";
import MainPage from "./MainPage";

// Header component with clickable Avatar
const Header = () => {
  const { user } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{ color: "#fff" }}
            >
              Wallet Tracker
            </Typography>
          </Link>
        </Container>
        {user && (
          <Link to="/profile">
            <Avatar alt={user?.name} sx={{ cursor: "pointer" }} />
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Header />
      <Container sx={{ mt: 4 }}>
        {user ? (
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        )}
      </Container>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
