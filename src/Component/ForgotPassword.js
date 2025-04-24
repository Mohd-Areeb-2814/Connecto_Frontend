import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|in)$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format. Email must include '@' and a valid domain (e.g., .com, .org, .in).");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain at least one special character, and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setSuccess("");

    // Final validation before submission

    validateEmail(email);

    validatePassword(newPassword);

    validateConfirmPassword(confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      setError("Please fix the errors before submitting.");

      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/user-api/v1/users/forgot-password",

        {
          email,

          newPassword,

          confirmPassword,
        }
      );

      setSuccess(response.data);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("email does not exist.");

      console.error("Error resetting password:", err);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "10px" }}>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Enter your email address and new password to reset your password.
          </Typography>

          {/* Form */}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                validateEmail(e.target.value);
              }}
              error={!!emailError}
              helperText={emailError}
              variant="outlined"
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);

                validatePassword(e.target.value);
              }}
              error={!!passwordError}
              helperText={passwordError}
              variant="outlined"
            />

            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);

                validateConfirmPassword(e.target.value);
              }}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              variant="outlined"
            />

            {/* Success and Error Messages */}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}

            {/* Submit Button */}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            sx={{ mt: 1 }}
          >
            Remembered your password?{" "}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
