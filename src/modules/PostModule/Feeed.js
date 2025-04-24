import React, { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

import PeopleIcon from "@mui/icons-material/People";

import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
const Feeed = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Navbar */}

      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo */}

          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",

              fontFamily: "Arial, sans-serif",

              cursor: "pointer",

              color: "#1877F2", // Facebook brand color for the text
            }}
            onClick={() => handleNavigation("/feed")}
          >
            Facebook
          </Typography>

          {/* Center: Navigation Icons */}

          <div style={{ display: "flex", gap: "1rem" }}>
            <IconButton
              color="primary" // Set icon color to blue
              onClick={() => handleNavigation("/feed")}
            >
              <HomeIcon />
            </IconButton>

            <IconButton
              color="primary" // Set icon color to blue
              onClick={() => handleNavigation("/friends")}
            >
              <PeopleIcon />
            </IconButton>
          </div>

          {/* Right: Profile Picture and Name */}

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {user && (
              <>
                <Avatar
                  src={user.profilePicture || ""}
                  alt={user.username}
                  style={{ width: "35px", height: "35px" }}
                />

                <Typography variant="subtitle1" style={{ color: "#1877F2" }}>
                  {user.username}
                </Typography>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Feed Content */}

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the Feed, {user?.username || "Guest"}!
        </Typography>

        {/* Feed posts will be rendered here */}

        {/* Add logic to display posts */}
      </div>
    </div>
  );
};
export default Feeed;
