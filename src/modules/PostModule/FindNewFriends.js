import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Card,
  CardActions,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import axios from "axios";

const FindNewFriends = () => {
  const [users, setUsers] = useState([]);

  const [loggedInUsername, setLoggedInUsername] = useState("");

  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's username

  useEffect(() => {
    const fetchLoggedInUsername = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user-api/v1/users/profile",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const { username } = response.data;

        setLoggedInUsername(username);
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedInUsername();
  }, []);

 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9900/newUser/username-profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const formattedUsers = response.data

          .filter((user) => user.username !== loggedInUsername) // my username is neglected here 12-27

          .map((user) => ({
            ...user,

            isRequestSent: false, 
          }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (loggedInUsername) {
      fetchUsers();
    }
  }, [loggedInUsername]);

  const handleAddFriend = async (receiverUsername, index) => {
    try {
      const response = await axios.post(
        "http://localhost:9900/newUser/addFriend",

        null,

        {
          params: {
            senderUsername: loggedInUsername,

            receiverUsername,
          },
        }
      );

      console.log("Friend request sent:", response.data);

      // Update state to reflect the sent request or cancellation

      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];

        updatedUsers[index].isRequestSent =
          response.data === "add friend" ? false : true; // Toggle based on response

        return updatedUsers;
      });
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0f2f5",

        minHeight: "100vh",

        padding: "20px",
      }}
    >
      <Grid container spacing={3}>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",

                flexDirection: "column",

                padding: "10px 16px",

                backgroundColor: "#ffffff",

                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",

                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  marginBottom: "16px",
                }}
              >
                <Avatar
                  src={`http://localhost:3336${user.profilePictureUrl}`} // Fallback profile picture
                  alt={user.username}
                  sx={{
                    width: 80,

                    height: 80,

                    marginRight: "16px",
                  }}
                />

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {user.username}
                  </Typography>
                </Box>
              </Box>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color={user.isRequestSent ? "secondary" : "primary"}
                  onClick={() => handleAddFriend(user.username, index)}
                  sx={{
                    backgroundColor: user.isRequestSent ? "#f44336" : "#1877f2",

                    color: "#fff",

                    textTransform: "capitalize",

                    "&:hover": {
                      backgroundColor: user.isRequestSent
                        ? "#d32f2f"
                        : "#165cdb",
                    },
                  }}
                >
                  {user.isRequestSent ? "Cancel Request" : "Add Friend"}
                </Button>

                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FindNewFriends;
