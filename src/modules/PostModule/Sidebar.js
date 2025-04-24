import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  People as PeopleIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Lock as LockIcon,
  ExitToApp as LogoutIcon,
  PostAdd as PostAddIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation hook to get the current path
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location/path
  const [activeTab, setActiveTab] = useState(""); // State to track active tab
  const[email,setEmail]=useState("");

  // Define menu items
  const menuItems = [
    { label: "Posts", path: "/feed", icon: <PostAddIcon /> },
    { label: "Friends", path: "/viewfriends", icon: <PeopleIcon /> },
    {
      label: "Update Profile",
      path: "/profilesettings",
      icon: <AccountCircleIcon />,
    },
    { label: "View Photos", path: "/viewphotos", icon: <PhotoLibraryIcon /> },
    { label: "Privacy", path: "/profile", icon: <LockIcon /> },
    { label: "About", path: "/viewabout", icon: <InfoIcon /> },
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
    { label: "Logout", path: "/logout", icon: <LogoutIcon /> },
  ];

  // Set active tab based on current location (path)
  useEffect(() => {
    setActiveTab(location.pathname); // Set the active tab based on current path
  }, [location]);

  // Handle navigation
  const handleNavigation = (path) => {
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  // Handle logout

  const handleLogout = () => {
    // 09/01
    axios
      .post(
        "http://localhost:5000/user-api/v1/users/logout",
        { email },
        {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("jwtToken"); // Clear the token
        navigate("/login"); // Redirect to login
      })

      .catch((error) => {
        const errorMessage = error.response?.data || "Something went wrong.";

        console.error("Login error:", errorMessage);
        //fallback logic
      })

      .finally(() => {});

    //09 01
  };
  //   const handleLogout = () => {
  //     localStorage.removeItem("jwtToken"); // Clear the token
  //     navigate("/login"); // Redirect to login
  //   };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#fff",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
        padding: "16px",
        overflowY: "auto",
      }}
    >
      {/* Sidebar Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#3b5998",
          textAlign: "center",
        }}
      >
        Home
      </Typography>

      {/* Sidebar Menu */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor:
                  activeTab === item.path ? "#e7f3ff" : "transparent", // Highlight active tab
                "&:hover": {
                  backgroundColor: "#f0f2f5",
                },
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon
                sx={{ color: activeTab === item.path ? "#3b5998" : "#888" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: "medium",
                  color: activeTab === item.path ? "#3b5998" : "#333",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
