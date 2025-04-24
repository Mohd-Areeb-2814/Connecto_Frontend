import React from "react";

import { useNavigate } from "react-router-dom";

import { Box, Avatar, Typography } from "@mui/material";



const CreatePostButton = () => {

 const navigate = useNavigate();



 return (

  <Box

   sx={{

    position: "fixed", // Make it fixed to the screen

    top: "70px", // Adjust the position to align below the navbar

    left: "50%",

    transform: "translateX(-50%)",

    zIndex: 1000, // Ensure it's above other content

    display: "flex",

    alignItems: "center",

    maxWidth: "600px",

    width: "100%",

    backgroundColor: "#F0F2F5", // Light gray background

    borderRadius: "30px",

    padding: "10px 15px",

    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",

    cursor: "pointer",

    transition: "background-color 0.2s ease",

    "&:hover": {

     backgroundColor: "#E4E6EB", // Slightly darker background on hover

    },

   }}

   onClick={() => navigate("/createpost")}

  >

   <Avatar

    sx={{

     bgcolor: "#3f51b5",

     width: 40,

     height: 40,

     mr: 2,

     fontSize: "1.2rem",

    }}

   >

    +

   </Avatar>

   <Typography

    variant="body1"

    sx={{ fontWeight: "bold", color: "#65676B", flexGrow: 1 }}

   >

    What's on your mind?

   </Typography>

  </Box>

 );

};



export default CreatePostButton;