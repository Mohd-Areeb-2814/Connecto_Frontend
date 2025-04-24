import React, { useEffect, useState } from "react";
import { Typography, Box, Avatar, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
 
const PostListFriends = ({ setActiveTab }) => {
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
      <Typography variant="h6" sx={{ marginBottom: "1px", fontWeight: "bold" }}>
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
         
          //online ofline status
          const isOnline = isSender ? friend.receiverStatus : friend.senderStatus;
 
         
          console.log(
            `Friend: ${friendUsername} | Sender Status: ${friend.senderStatus} | Receiver Status: ${friend.receiverStatus} | Online: ${isOnline}`
          );
 
          return (
            <Box
              key={friend.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Friend's Info */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={`http://localhost:3336${friendProfilePictureUrl}`}
                    alt={friendUsername}
                    sx={{
                      width: 48,
                      height: 48,
                      border: "2px solid #3f51b5",
                    }}
                  />
                  {/* Online/Offline Indicator */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: isOnline ? "green" : "gray",
                      border: "2px solid #fff",
                    }}
                  />
                </Box>
 
                <Typography
                  variant="subtitle1"
                  sx={{
                    cursor: "pointer",
                    color: "#3f51b5",
                  }}
                  onClick={() =>
                    navigate(`/userprofile?username=${friendUsername}`)
                  }
                >
                  {friendUsername}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
 
export default PostListFriends;