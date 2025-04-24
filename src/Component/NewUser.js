import React, { useState } from "react";

import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

import axios from "axios";

const NewUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",

    surname: "",

    dateOfBirth: null,

    gender: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [popupMessage, setPopupMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Live validation for each field

    if (name === "firstName" || name === "surname") {
      // const regex = /^[A-Z][a-z]*$/;
      const regex = /^[A-Z][a-zA-Z0-9]*$/;

      if (!regex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,

          [name]: `${
            name === "firstName" ? "First name" : "Surname"
          } must start with a capital letter.`,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    if (name === "gender") {
      setErrors((prevErrors) => ({
        ...prevErrors,

        gender: value ? "" : "please select a gender.",
      }));
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|in)$/;

      setErrors((prevErrors) => ({
        ...prevErrors,

        email: emailRegex.test(value)
          ? ""
          : "Invalid email format. Email must include '@' and a valid domain (e.g., .com, .org, .in).",
      }));

      if (emailRegex.test(value)) {
        try {
          const response = await axios.get(
            `http://localhost:3336/user-api/v1/users/check-email?email=${value}`
          );

          if (response.data.exists) {
            setErrors((prevErrors) => ({
              ...prevErrors,

              email: "This email is already registered.",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,

              email: "",
            }));
          }
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,

            email: "Error checking email. Please try again.",
          }));
        }
      }
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,12}$/;

      setErrors((prevErrors) => ({
        ...prevErrors,

        password: passwordRegex.test(value)
          ? ""
          : "Password must be 8-12 characters long, include lowercase, uppercase, digits, and special characters.",
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,

        confirmPassword:
          value === formData.password ? "" : "Passwords do not match.",
      }));
    }
  };

  const handleDateChange = (date) => {
    const today = dayjs();

    const minAllowedDate = today.subtract(13, "years");

    if (!date) {
      setErrors((prevErrors) => ({
        ...prevErrors,

        dateOfBirth: "Date of birth is required.",
      }));
    } else if (dayjs(date).isAfter(minAllowedDate)) {
      setErrors((prevErrors) => ({
        ...prevErrors,

        dateOfBirth: "You must be at least 13 years old.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: "" }));
    }

    setFormData({ ...formData, dateOfBirth: date });
  };

  const validateForm = () => {
    const newErrors = {};

    const {
      firstName,

      surname,

      dateOfBirth,

      gender,

      email,

      password,

      confirmPassword,
    } = formData;

    if (!firstName) newErrors.firstName = "First name is required.";
    else if (!/^[A-Z][a-zA-Z0-9]*$/.test(firstName))
      newErrors.firstName = "First name must start with a capital letter.";

    if (!surname) newErrors.surname = "Surname is required.";
    else if (!/^[A-Z][a-zA-Z0-9]*$/.test(surname))
      newErrors.surname = "Surname must start with a capital letter.";

    if (!dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    else if (dayjs(dateOfBirth).isAfter(dayjs().subtract(13, "years")))
      newErrors.dateOfBirth = "You must be at least 13 years old.";

    if (!gender) newErrors.gender = "Please select a gender.";

    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.(com|org|in)$/.test(email))
      newErrors.email =
        "Invalid email format. Email must include '@' and a valid domain (e.g., .com, .org, .in).";

    if (!password) newErrors.password = "Password is required.";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,12}$/.test(password)
    )
      newErrors.password =
        "Password must be 8-12 characters long, include lowercase, uppercase, digits, and special characters.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    try {
      await axios.post(
        "http://localhost:5000/user-api/v1/users/register",

        formData
      );

      setPopupMessage("Registration Successful!");

      setShowPopup(true);
    } catch (error) {
      setPopupMessage(
        error.response?.data?.message ||
          "Registration Failed. Please try again."
      );

      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);

    if (popupMessage === "Registration Successful!") {
      window.location.href = "/login";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: "100%", maxWidth: 500 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#007BFF" }}
        >
          Facebook
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Create a new account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                error={!!errors.surname}
                helperText={errors.surname}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      error: !!errors.dateOfBirth,

                      helperText: errors.dateOfBirth,

                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Gender
              </Typography>

              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />

                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />

                <FormControlLabel
                  value="Others"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>

              {errors.gender && (
                <Typography color="error" variant="body2">
                  {errors.gender}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#007BFF", width: "80%" }}
              >
                Create Account
              </Button>

              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Already have an account? <a href="/login">Login here</a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Popup Dialog */}

      <Dialog open={showPopup} onClose={handlePopupClose}>
        <DialogTitle>{popupMessage}</DialogTitle>

        <DialogActions>
          <Button onClick={handlePopupClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewUser;
