// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";

// MUI Components
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";

// MUI Icons
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  ArrowForward,
} from "@mui/icons-material";

// Assets & Styles
import "../../styles/Login.css";
import Logo from "../../images/Logo_Piagam.svg?react";

const LoginPage = () => {
  /* =======================
   * STATE
   * ======================= */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* =======================
   * HANDLER
   * ======================= */
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔐 Login via AuthService
      const response = await authService.login(username, password);
      
      console.log("✅ Login sukses:", response);

      // 🎯 Redirect berdasarkan role
      const userRole = response.user?.role || "user";
      
      if (userRole === "admin") {
        navigate("/ticket-monitoring", { replace: true });
      } else {
        navigate("/my-ticket", { replace: true });
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      
      // 🚨 Display error message
      setError(err.message || "Login gagal. Periksa username dan password.");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
   * RENDER
   * ======================= */
  return (
    <Box className="login-container">
      {/* ===== Animated Background ===== */}
      <Box className="animated-bg">
        <Box className="circle circle-1" />
        <Box className="circle circle-2" />
        <Box className="circle circle-3" />
      </Box>

      {/* ===== LEFT : HERO SECTION ===== */}
      <Box className="login-left">
        <Box className="hero-content">
          {/* Logo */}
          <Box className="logo-wrapper">
            <Box className="brand-logo-main">
              <Logo width={50} height={50} />
            </Box>

            <Typography variant="h4" className="brand-name">
              PT. Pilar Niaga Makmur
            </Typography>
          </Box>

          {/* Hero Text */}
          <Box className="hero-text">
            <Typography variant="h2" className="hero-title">
              Welcome Back To Ticketing System
            </Typography>

            <Typography variant="h6" className="hero-subtitle">
              Manage, track, and resolve IT issues efficiently through a
              centralized support system
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box className="footer-info">
          <Typography variant="body2" className="copyright">
            © 2025 PT. Pilar Niaga Makmur
          </Typography>
        </Box>
      </Box>

      {/* ===== RIGHT : LOGIN FORM ===== */}
      <Box className="login-right">
        <Container maxWidth="sm">
          {/* ===== MOBILE HERO TEXT ===== */}
          <Box className="mobile-hero">
            <Typography className="mobile-hero-title">
              Welcome Back To Ticketing System
            </Typography>
          </Box>

          <Paper elevation={0} className="form-card">
            {/* Header */}
            <Box className="form-header">
              <Typography variant="h3" className="form-title">
                Sign In
              </Typography>

              <Typography variant="body1" className="form-subtitle">
                Welcome back! Please enter your details
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="login-form"
            >
              {/* Username */}
              <Box className="input-group">
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="Enter Your Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="custom-input"
                  required
                  disabled={loading}
                  autoComplete="username"
                  InputProps={{
                    className: "input-field",
                  }}
                />
              </Box>

              {/* Password */}
              <Box className="input-group">
                <TextField
                  fullWidth
                  label="Password"
                  placeholder="Enter your password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  InputProps={{
                    className: "input-field",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          className="visibility-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Button
                fullWidth
                size="large"
                variant="contained"
                className="submit-btn"
                type="submit"
                disabled={loading || !username || !password}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : isHovered ? (
                    <ArrowForward />
                  ) : (
                    <LoginIcon />
                  )
                }
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Register */}
              <Typography
                variant="body2"
                className="signup-text"
                textAlign="center"
              >
                Don't have an account?{" "}
                <Link
                  className="signup-link"
                  component="button"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading) navigate("/register");
                  }}
                  style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  Sign up for free
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;