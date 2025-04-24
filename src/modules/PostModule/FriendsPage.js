import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import DashboardNavbar from "./DashboardNavbar";

import FriendsSideBar from "./FriendsSideBar";

import FindNewFriends from "./FindNewFriends";

import FriendRequests from "./FriendRequests";

import AllFriends from "./AllFriends";

import FindFriends from "./FindFriends";



const FriendsPage = () => {

 const [activeTab, setActiveTab] = useState("findNewFriends");



 const renderContent = () => {

  switch (activeTab) {

   case "findNewFriends":

    return <FindNewFriends />;

   case "friendRequests":

    return <FriendRequests />;

   case "allFriends":

    return <AllFriends />;

   default:

    return (

     <Typography variant="h6">

      <FindFriends />

     </Typography>

    );

  }

 };



 return (

  <>

   {/* Navbar */}

   <Box

    sx={{

     position: "fixed",

     top: 0,

     left: 0,

     width: "100%",

     zIndex: 1000,

     backgroundColor: "#ffffff",

     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",

    }}

   >

    <DashboardNavbar />

   </Box>



   {/* Main Layout */}

   <Box

    sx={{

     display: "flex",

     minHeight: "100vh",

     backgroundColor: "#f0f2f5",

     marginTop: "50px", // Adjust to navbar height

    }}

   >

    {/* Fixed Sidebar */}

    <FriendsSideBar activeTab={activeTab} setActiveTab={setActiveTab} />



    {/* Scrollable Main Content */}

    <Box

     sx={{

      marginLeft: "250px", // Adjust to match sidebar width

      flex: 1,

      padding: "20px",

      overflowY: "auto", // Enable scrolling for content

     }}

    >

     {renderContent()}

    </Box>

   </Box>

  </>

 );

};



export default FriendsPage;