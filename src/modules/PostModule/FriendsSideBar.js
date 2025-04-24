import React from "react";

import { Box, Button } from "@mui/material";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import PeopleIcon from "@mui/icons-material/People";



const FriendsSideBar = ({ activeTab, setActiveTab }) => {

 const tabs = [

  { label: "Find New Friends", value: "findNewFriends", icon: <PersonSearchIcon /> },

  { label: "Friend Requests", value: "friendRequests", icon: <PersonAddIcon /> },

  { label: "All Friends", value: "allFriends", icon: <PeopleIcon /> },

 ];



 return (

  <Box

   sx={{

    position: "fixed",

    top: "50px",

    left: 0,

    height: "calc(100vh - 50px)",

    width: "250px",

    display: "flex",

    flexDirection: "column",

    padding: "30px",

    backgroundColor: "#ffffff",

    borderRight: "1px solid #ddd",

    overflowY: "auto",

   }}

  >

   {tabs.map((tab) => (

    <Button

     key={tab.value}

     onClick={() => setActiveTab(tab.value)}

     startIcon={tab.icon}

     sx={{

      display: "flex",

      alignItems: "center", // Ensures icon and text align properly

      justifyContent: "flex-start", // Aligns content to the left

      textAlign: "left",

      textTransform: "capitalize",

      fontWeight: activeTab === tab.value ? "bold" : "normal",

      color: activeTab === tab.value ? "#1877f2" : "#555",

      backgroundColor: activeTab === tab.value ? "#e3f2fd" : "transparent",

      "&:hover": {

       backgroundColor: activeTab === tab.value ? "#bbdefb" : "#f0f2f5",

       color: "#1877f2",

      },

      borderRadius: "8px",

      padding: "10px 16px",

      marginBottom: "8px",

      lineHeight: 1.5, // Improves alignment consistency

      gap: "8px", // Adds spacing between the icon and text

      whiteSpace: "nowrap", // Prevents text from wrapping into multiple lines

      overflow: "hidden", // Hides any text that overflows the container

      textOverflow: "ellipsis", // Adds ellipsis (…) if the text overflows

     }}

    >

     {tab.label}

    </Button>

   ))}

  </Box>

 );

};



export default FriendsSideBar;