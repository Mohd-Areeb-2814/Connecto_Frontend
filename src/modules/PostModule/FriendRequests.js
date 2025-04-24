import React, { useEffect, useState } from "react";

import {

 Box,

 Card,

 Typography,

 Avatar,

 Button,

} from "@mui/material";

import axios from "axios";



const FriendRequests = () => {

 const [friendRequests, setFriendRequests] = useState([]);

 const [loggedInUsername, setLoggedInUsername] = useState("");

 const [loading, setLoading] = useState(true);



 // Fetch logged-in user's username

 useEffect(() => {

  const fetchLoggedInUsername = async () => {

   try {

    console.log("Fetching logged-in username...");

    const response = await axios.get("http://localhost:5000/user-api/v1/users/profile", {

     headers: {

      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,

     },

    });

    const { username } = response.data;

    console.log("Logged-in username:", username);

    setLoggedInUsername(username);

   } catch (error) {

    console.error("Error fetching logged-in user data:", error);

   } finally {

    setLoading(false);

   }

  };

  fetchLoggedInUsername();

 }, []);



 // Fetch friend requests for the logged-in user

 useEffect(() => {

  if (loggedInUsername) {

   console.log("Fetching friend requests for:", loggedInUsername);

   const fetchFriendRequests = async () => {

    try {

     const response = await axios.get("http://localhost:9900/friendRequest/getRequest", {

      params: { receiverUsername: loggedInUsername },

     });

     console.log("Friend requests received:", response.data);

     setFriendRequests(response.data);

    } catch (error) {

     console.error("Error fetching friend requests:", error);

    }

   };

   fetchFriendRequests();

  }

 }, [loggedInUsername]);



 // Confirm friend request

 const handleConfirm = async (senderUsername) => {

  try {

   const response = await axios.post("http://localhost:9900/friendRequest/confirm", null, {

    params: {

     senderUsername,

     receiverUsername: loggedInUsername,

    },

   });

   console.log("Friend request confirmed:", response.data);

   // Remove confirmed request from the state

   setFriendRequests((prevRequests) =>

    prevRequests.filter((request) => request.senderUsername !== senderUsername)

   );

  } catch (error) {

   console.error("Error confirming friend request:", error);

  }

 };



 // Delete friend request

 const handleDelete = async (senderUsername) => {

  try {

   const response = await axios.delete("http://localhost:9900/friendRequest/deleteRequest", {

    params: {

     senderUsername,

     receiverUsername: loggedInUsername,

    },

   });

   console.log("Friend request deleted:", response.data);

   // Remove deleted request from the state

   setFriendRequests((prevRequests) =>

    prevRequests.filter((request) => request.senderUsername !== senderUsername)

   );

  } catch (error) {

   console.error("Error deleting friend request:", error);

  }

 };



 if (loading) {

  return (

   <Typography sx={{ textAlign: "center", marginTop: "20px" }}>

    Loading...

   </Typography>

  );

 }



 if (friendRequests.length === 0) {

  return (

   <Box sx={{ textAlign: "center", padding: "20px" }}>

    <Typography variant="h6" sx={{ marginBottom: "10px" }}>

     You have no friend requests.

    </Typography>

    <Typography variant="body1" sx={{ marginBottom: "20px" }}>

     Connect with others to make new friends!

    </Typography>

   </Box>

  );

 }


 console.log("Rendering friend requests...");



 return (

  <Box

   sx={{

    backgroundColor: "#f0f2f5", // Facebook-like background

    minHeight: "100vh",

    padding: "20px",

   }}

  >

   {friendRequests.map((request) => (

    <Card

     key={request.senderUsername}

     sx={{

      display: "flex",

      alignItems: "center",

      justifyContent: "space-between",

      padding: "10px 16px",

      marginBottom: "10px",

      backgroundColor: "#ffffff",

      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",

      borderRadius: "8px",

     }}

    >

     {/* Avatar and Details */}

     <Box sx={{ display: "flex", alignItems: "center" }}>

      <Avatar

       src={`http://localhost:3336${request.senderProfilePictureUrl}`} // Default profile picture

       alt={request.senderUsername}

       sx={{

        width: 56,

        height: 56,

        marginRight: "16px",

       }}

      />

      <Box>

       <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>

        {request.senderUsername}

       </Typography>

       <Typography variant="body2" color="text.secondary">

        No mutual friends {/* Replace with actual data if needed */}

       </Typography>

      </Box>

     </Box>

     {/* Actions */}

     <Box sx={{ display: "flex", gap: 2 }}>

      <Button

       variant="contained"

       color="primary"

       onClick={() => handleConfirm(request.senderUsername)}

       sx={{

        textTransform: "capitalize",

        backgroundColor: "#1877f2",

        "&:hover": {

         backgroundColor: "#165cdb",

        },

       }}

      >

       Confirm

      </Button>

      <Button

       variant="outlined"

       color="error"

       onClick={() => handleDelete(request.senderUsername)}

       sx={{

        textTransform: "capitalize",

       }}

      >

       Delete Request

      </Button>

     </Box>

    </Card>

   ))}

  </Box>

 );

};



export default FriendRequests;