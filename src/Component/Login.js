import React, { useState } from "react";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [popupMessage, setPopupMessage] = useState("");

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [cooldownTime, setCooldownTime] = useState(0);

  const navigate = useNavigate();

  const startCooldown = (duration) => {
    setIsButtonDisabled(true);

    setCooldownTime(duration);

    const interval = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setIsButtonDisabled(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
   

    setIsLoading(true);

    axios

      .post("http://localhost:5000/user-api/v1/users/login", {
        email,
        password,
      })

      .then((response) => {
        const token = response.data;

        localStorage.setItem("jwtToken", token);
        

        setPopupMessage("Login successful!");

        setIsPopupVisible(true);

        setTimeout(() => {
          setIsPopupVisible(false);

          navigate("/dashboard");
        }, 2000);
      })

      .catch((error) => {
        const errorMessage = error.response?.data || "Something went wrong.";

        console.error("Login error:", errorMessage);
//fallback logic

        if (errorMessage.includes("Please hold for 1 min")) {
          setPopupMessage(errorMessage);

          setIsPopupVisible(true);

          startCooldown(60); // Start cooldown for 60 seconds
        } else {
          setPopupMessage(errorMessage);

          setIsPopupVisible(true);
        }
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Grid container spacing={4}>
          {/* Left Section */}

          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              facebook
            </Typography>

            <Typography variant="h6" color="textSecondary">
              Facebook helps you connect and share with the people in your life.
            </Typography>
          </Grid>

          {/* Right Section */}

          <Grid item xs={12} md={6}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {isPopupVisible && (
                <Alert
                  severity={
                    popupMessage === "Login successful!" ? "success" : "error"
                  }
                >
                  {popupMessage}
                </Alert>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={isLoading || isButtonDisabled}
                sx={{ fontWeight: "bold", py: 1.5 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : isButtonDisabled ? (
                  `Retry in ${cooldownTime}s`
                ) : (
                  "Login"
                )}
              </Button>

              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/forgotpassword")}
                fullWidth
              >
                Forgot Password?
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/newuser")}
                fullWidth
                sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
              >
                Create New Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
