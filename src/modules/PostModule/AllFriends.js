

import React, { useEffect, useState } from "react";

import {

 Card,

 Typography,

 Grid,

 Button,

 Box,

 Avatar,

 Stack,

} from "@mui/material";

import axios from "axios";

import { useNavigate } from "react-router-dom";



const AllFriends = ({ setActiveTab }) => {

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

    <Button

     variant="contained"

     color="primary"

     onClick={() => setActiveTab("findNewFriends")}

    >

     Find New Friends

    </Button>

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

   <Grid container spacing={2}>

    {friends.map((friend) => {

     const isSender = friend.senderUsername === loggedInUsername;

     const friendUsername = isSender

      ? friend.receiverUsername

      : friend.senderUsername;

     const friendProfilePictureUrl = isSender

      ? friend.receiverProfilePictureUrl

      : friend.senderProfilePictureUrl;



     return (

      <Grid item xs={6} sm={4} md={3} key={friend.id}>

       <Card

        sx={{

         boxShadow: 3,

         borderRadius: "12px",

         overflow: "hidden",

         backgroundColor: "#fdfdfd",

         textAlign: "center",

         padding: "12px",

        }}

       >

        <Stack
        

         direction="column"

         alignItems="center"

         spacing={1}

         sx={{ marginBottom: "8px" }}

        >

         <Avatar

          src={`http://localhost:3336${friendProfilePictureUrl}`}

          alt={friendUsername}

          sx={{
           

           width: 64,

           height: 64,

           border: "2px solid #3f51b5",

          }}

         />

         <Typography

          variant="subtitle1"

          sx={{ fontWeight: "bold", color: "#333" }}

         >

          {friendUsername}

         </Typography>

        </Stack>

        <Box

         sx={{

          display: "flex",

          justifyContent: "center",

          gap: "8px",

          borderTop: "1px solid #e0e0e0",

          paddingTop: "8px",

         }}

        >

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

        </Box>

       </Card>

      </Grid>

     );

    })}

   </Grid>

  </Box>

 );

};



export default AllFriends;

