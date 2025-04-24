import React, { useEffect, useState } from "react";

import {

 Typography,

 Button,

 Box,

 Avatar,

 Stack,



} from "@mui/material";

import axios from "axios";

import { useNavigate } from "react-router-dom";



const TimelineAllFriends = ({ setActiveTab }) => {

 const navigate = useNavigate();

 const [friends, setFriends] = useState([]);

 const [loading, setLoading] = useState(true);

 const [loggedInUsername, setLoggedInUsername] = useState(null);



 // Fetch the logged-in user's information

 useEffect(() => {

  const fetchUserProfile = async () => {

   try {

    const response = await axios.get(

     "http://localhost:5000/user-api/v1/users/profile",

     {

      headers: {

       Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,

      },

     }

    );

    setLoggedInUsername(response.data.username);

   } catch (error) {

    console.error("Error fetching user profile:", error);

   }

  };

  fetchUserProfile();

 }, []);



 // Fetch friends once the logged-in username is retrieved

 useEffect(() => {

  if (!loggedInUsername) return;

  const fetchFriends = async () => {

   try {

    const response = await axios.get(

     "http://localhost:9900/allFriends/getAllFriends",

     {

      params: { username: loggedInUsername },

     }

    );

    setFriends(response.data);

   } catch (error) {

    console.error("Error fetching friends:", error);

   } finally {

    setLoading(false);

   }

  };

  fetchFriends();

 }, [loggedInUsername]);



 // Handle unfriend action

 const handleUnfriend = async (senderUsername, receiverUsername) => {

  try {

   await axios.delete("http://localhost:9900/friendRequest/unFriend", {

    params: {

     senderUsername: senderUsername,

     receiverUsername: receiverUsername,

    },

   });

   setFriends((prevFriends) =>

    prevFriends.filter(

     (friend) =>

      !(

       friend.senderUsername === senderUsername &&

       friend.receiverUsername === receiverUsername

      )

    )

   );

  } catch (error) {

   console.error("Error unfriending user:", error);

  }

 };



 if (loading) {

  return (

   <Typography sx={{ textAlign: "center", marginTop: "20px" }}>

    Loading...

   </Typography>

  );

 }



 if (friends.length === 0) {

  return (

   <Box sx={{ textAlign: "center", padding: "20px" }}>

    <Typography variant="h6" sx={{ marginBottom: "10px" }}>

     You have no friends yet.

    </Typography>

    {/* <Button

     variant="contained"

     color="primary"

     onClick={() => setActiveTab("findNewFriends")}

    >

     Find New Friends

    </Button> */}

   </Box>

  );

 }



 return (

  <Box sx={{ padding: "16px" }}>

   <Typography

    variant="h5"

    sx={{ marginBottom: "16px", fontWeight: "bold" }}

   >

    All Friends

   </Typography>

   <Stack spacing={1}>

    {friends.map((friend) => {

     const isSender = friend.senderUsername === loggedInUsername;

     const friendUsername = isSender

      ? friend.receiverUsername

      : friend.senderUsername;

     const friendProfilePictureUrl = isSender

      ? friend.receiverProfilePictureUrl

      : friend.senderProfilePictureUrl;



     return (

      <Box

       key={friend.id}

       sx={{

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        padding: "8px 16px",

        borderRadius: "8px",

        border: "1px solid #e0e0e0",

        backgroundColor: "#f9f9f9",

       }}

      >

       {/* Friend's Info */}

       <Stack direction="row" alignItems="center" spacing={2}>

        <Avatar

         src={`http://localhost:3336${friendProfilePictureUrl}`}

         alt={friendUsername}

         sx={{

          width: 48,

          height: 48,

          border: "2px solid #3f51b5",

         }}

        />

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>

         {friendUsername}

        </Typography>

       </Stack>



       {/* Action Buttons */}

       <Stack direction="row" spacing={2}>

        <Button

         variant="contained"

         color="primary"

         sx={{

          borderRadius: "20px",

          textTransform: "none",

          fontWeight: "bold",

          fontSize: "12px",

          padding: "4px 12px",

         }}

         onClick={() => {

          navigate(`/userprofile?username=${friendUsername}`);

         }}

        >

         View Profile

        </Button>

        <Button

         variant="outlined"

         color="error"

         sx={{

          borderRadius: "20px",

          textTransform: "none",

          fontWeight: "bold",

          fontSize: "12px",

          padding: "4px 12px",

         }}

         onClick={() =>

          handleUnfriend(

           friend.senderUsername,

           friend.receiverUsername

          )

         }

        >

         Unfriend

        </Button>

       </Stack>

      </Box>

     );

    })}

   </Stack>

  </Box>

 );

};



export default TimelineAllFriends;