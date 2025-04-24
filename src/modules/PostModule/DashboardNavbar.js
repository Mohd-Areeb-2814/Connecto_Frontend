import React, { useState, useEffect } from "react";

import {

 AppBar,

 Toolbar,

 Typography,

 IconButton,

 Avatar,

 Box,

 Button,

} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

import PeopleIcon from "@mui/icons-material/People";

import { useNavigate } from "react-router-dom";

import axios from "axios";



const DashboardNavbar = () => {

 const [user, setUser] = useState(null);
 const[email,setEmail]=useState("");

 const [activeTab, setActiveTab] = useState("home"); // Track the active tab

 const navigate = useNavigate();



 useEffect(() => {

  const token = localStorage.getItem("jwtToken");

  console.log(token);

  if (token) {

   axios

    .get("http://localhost:5000/user-api/v1/users/profile", {

     headers: {

      Authorization: `Bearer ${token}`,

     },

    })

    .then((response) => {

     console.log(response.data);

     setUser(response.data);

    })

    .catch((error) => {

     console.error("Error fetching user data:", error);

    });

  }

 }, []);



 const handleNavigation = (path, tab) => {

  setActiveTab(tab); // Set the active tab on navigation

  navigate(path);

 };



 // Logout handler

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

    .finally(() => {
      localStorage.removeItem("jwtToken"); 
      navigate("/login");
    });

  //09 01
};



 return (

  <>

   <AppBar position="static" style={{ backgroundColor: "#fff" }}>

    <Toolbar

     style={{

      display: "flex",

      justifyContent: "space-between",

      alignItems: "center",

     }}

    >

     {/* Left: Logo */}

     <Typography

      variant="h6"

      style={{

       fontWeight: "bold",

       fontFamily: "Arial, sans-serif",

       color: "#4267B2",

       cursor: "pointer",

      }}

      onClick={() => handleNavigation("/dashboard", "home")}

     >

      Facebook

     </Typography>

     {/* Center: Navigation Icons */}

     <Box style={{ display: "flex", gap: "1rem" }}>

      <IconButton

       color={activeTab === "home" ? "primary" : "default"} // Change color based on active state

       onClick={() => handleNavigation("/dashboard", "home")}

      >

       <HomeIcon />

      </IconButton>

      <IconButton

       color={activeTab === "people" ? "primary" : "default"} // Change color based on active state

       onClick={() => handleNavigation("/friendspage", "people")}

      >

       <PeopleIcon />

      </IconButton>

     </Box>

     {/* Right: Profile Section and Logout Button */}

     <Box style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {user && (
        <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box style={{ position: "relative" }}>
            <Avatar
              src={`http://localhost:3336${user.profilePictureUrl}?timestamp=${new Date().getTime()}`}
              alt={user.firstName}
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
              onClick={() => handleNavigation("/profile", "profile")}
            />
            {/* Online Indicator */}
            {user.online && (
              <Box
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                  border: "2px solid white",
                }}
              />
            )}
          </Box>

          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              color: "#4267B2",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation("/profile", "profile")}
          >
            {user.firstName} {user.surname}
          </Typography>
        </Box>
      )}

      {/* Logout Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>

    </Toolbar>

   </AppBar>

  </>

 );

};



export default DashboardNavbar;