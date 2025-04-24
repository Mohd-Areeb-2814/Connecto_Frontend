import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import axios from "axios";

import {
  Box,
  Avatar,
  Typography,
  Card,
  Button,
  Stack,
  Divider,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { formatDistanceToNow } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";

import DashboardNavbar from "./DashboardNavbar";

const UserProfile = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const username = params.get("username");

  const [profile, setProfile] = useState(null);

  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState({});

  const [friends, setFriends] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(false); // State to control dialog open/close
  // Fetch user profile

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/friend-profile-api/friendProfile`,

          { params: { username } }
        );

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (username) fetchProfile();
  }, [username]);

  // Fetch user posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/friend-profile-api/friendPost`,

          { params: { username } }
        );

        // Ensure response is an array and sort by timestamp in descending order

        const sortedPosts = Array.isArray(response.data)
          ? response.data.sort(
              (a, b) => new Date(b.postTimeStamp) - new Date(a.postTimeStamp)
            )
          : [];

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchPosts();
  }, [username]);

  // Fetch friends list

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/friend-profile-api/friendsOfFriend`,

          { params: { username } }
        );

        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (username) fetchFriends();
  }, [username]);

  // Fetch comments for a specific post

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/friend-profile-api/postComments`,

        { params: { postId } }
      );

      setComments((prevComments) => ({
        ...prevComments,

        [postId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!profile) {
    return <Typography>User not found</Typography>;
  }
  // Open dialog

  const handleOpenDialog = (image) => {
    setSelectedImage(image);

    setOpenDialog(true);
  };

  // Close dialog

  const handleCloseDialog = () => {
    setOpenDialog(false);

    setSelectedImage("");
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
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

      {/* Profile Header */}

      <Box
        sx={{
          padding: "16px",

          textAlign: "center",

          marginTop: "50px", // Adjusting to allow space for the navbar

          backgroundColor: "#ffffff",
        }}
      >
        {/* Cover Photo */}

        <Box
          sx={{
            position: "relative",

            height: "250px",

            backgroundImage: `url(http://localhost:3336${profile.coverPhotoUrl})`,

            backgroundSize: "cover",

            backgroundPosition: "center",

            borderRadius: "8px",
          }}
        />

        {/* Profile Picture & Name */}

        {/* <Box
          sx={{
            position: "absolute",

            top: "250px", // Position below cover photo

            left: "30px",

            display: "flex",

            alignItems: "center",

            gap: "16px",
            backgroundColor: "transparent",

            padding: "8px",

            borderRadius: "12px",
            boxShadow: "none",
            border: "none",

            //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Avatar
            src={`http://localhost:3336${profile.profilePictureUrl}`}
            alt={profile.username}
            sx={{
              width: 120,
              height: 120,
              borderRadius: "0px",
              border: "3px solid white",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />

          <Box sx={{ marginTop: "58px" }}>
            <Typography variant="h4">
              {profile.firstName} {profile.surname}
            </Typography>
          </Box>
        </Box> */}
          <Box
      sx={{
        position: "absolute",
        top: "250px", // Position below cover photo
        left: "30px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        backgroundColor: "transparent",
        padding: "8px",
        borderRadius: "12px",
        boxShadow: "none",
      }}
    >
      <Avatar
        src={`http://localhost:3336${profile.profilePictureUrl}`}
        alt={profile.username}
        sx={{
          width: 120,
          height: 120,
          borderRadius: "0px",
          border: "3px solid white",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          cursor: "pointer", // Make the avatar clickable
        }}
        onClick={handleClickOpen} // Open the dialog on click
      />

      <Box sx={{ marginTop: "58px" }}>
        <Typography variant="h4">
          {profile.firstName} {profile.surname}
        </Typography>
      </Box>

      {/* Dialog Component */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            padding: 0,  // Remove padding inside the dialog
            margin: 0,   // Remove margin
            boxShadow: 'none', // Remove box shadow
            borderRadius: '0', // Remove border radius
          },
        }}
      >
        <DialogTitle sx={{ padding: 0, position: 'relative' }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose} // Close the dialog on click
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <img
            src={`http://localhost:3336${profile.profilePictureUrl}`}
            alt="Profile"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover', // Ensure the image fits well
              borderRadius: '0', // No border radius
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
      </Box>

      {/* Posts Section with Left and Right Side */}

      <Box
        sx={{
          padding: "16px",

          marginTop: "50px",

          display: "flex",

          justifyContent: "center",

          gap: "16px", // Space between the sections
        }}
      >
        {/* Left Section - Bio */}

        <Grid container spacing={3} sx={{ maxWidth: "300px" }}>
          <Grid item xs={12}>
            <Card sx={{ padding: "16px", borderRadius: "12px", boxShadow: 3 }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: "8px", fontWeight: "bold" }}
              >
                Bio & Contact Info
              </Typography>

              <Typography variant="body1">{profile.bio}</Typography>

              <Typography variant="body2" color="textSecondary">
                {profile.email}
              </Typography>
            </Card>

            <Grid item xs={12}>
              <Card
                sx={{
                  padding: "16px",
                  borderRadius: "12px",
                  boxShadow: 3,
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "8px", fontWeight: "bold" }}
                >
                  Photos
                </Typography>

                <Grid container spacing={1}>
                  {posts.map((post) => (
                    <Grid item xs={4} key={post.id}>
                      <img
                        src={`http://localhost:8082/post-service${post.mediaUrl}`}
                        alt="Post media"
                        style={{
                          width: "100%",

                          height: "80px",

                          objectFit: "cover",

                          borderRadius: "4px",

                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleOpenDialog(
                            `http://localhost:8082/post-service${post.mediaUrl}`
                          )
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogContent
                sx={{
                  position: "relative",

                  padding: "0px",

                  backgroundColor: "black",
                }}
              >
                <IconButton
                  onClick={handleCloseDialog}
                  sx={{
                    position: "absolute",

                    top: 10,

                    right: 10,

                    color: "white",
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <img
                  src={selectedImage}
                  alt="Selected media"
                  style={{ width: "100%", height: "auto" }}
                />
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>

        {/* Center Section - Posts */}

        <Grid container spacing={3} sx={{ flex: 1 }}>
          <Grid item xs={12}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  sx={{
                    width: "100%",

                    maxWidth: "800px",

                    padding: "16px",

                    borderRadius: "12px",

                    boxShadow: 3,

                    marginBottom: "10px",

                    backgroundColor: "#fdfdfd",
                  }}
                  key={post.id}
                >
                  {/* Post Header */}

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={`http://localhost:3336${post.profilePictureUrl}`}
                      alt={post.username}
                      sx={{ width: 48, height: 48 }}
                    />

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {post.username}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {formatDistanceToNow(new Date(post.postTimeStamp))} ago
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Post Content */}

                  <Box sx={{ marginTop: "16px" }}>
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                      {post.content}
                    </Typography>

                    {post.mediaUrl && (
                      <img
                        src={`http://localhost:8082/post-service${post.mediaUrl}`}
                        alt="Post media"
                        style={{
                          width: "100%",

                          maxHeight: "400px",

                          objectFit: "cover",

                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </Box>

                  {/* Post Footer */}

                  <Box
                    sx={{
                      display: "flex",

                      justifyContent: "space-between",

                      alignItems: "center",

                      marginTop: "12px",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {post.likesCount}{" "}
                      {post.likesCount === 1 ? "Like" : "Likes"}
                    </Typography>

                    <Button
                      variant="text"
                      size="small"
                      color="primary"
                      onClick={() => fetchComments(post.id)}
                    >
                      {comments[post.id] ? "Hide Comments" : "View Comments"}
                    </Button>
                  </Box>

                  {/* Comments Section */}

                  {comments[post.id] && (
                    <Box sx={{ marginTop: "16px" }}>
                      <Divider />

                      {comments[post.id].map((comment) => (
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          key={comment.id}
                          sx={{ marginTop: "8px" }}
                        >
                          <Avatar
                            src={`http://localhost:3336${comment.profilePictureUrl}`}
                            alt={comment.username}
                            sx={{ width: 32, height: 32 }}
                          />

                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {comment.username}
                            </Typography>

                            <Typography variant="body2">
                              {comment.text}
                            </Typography>

                            <Typography variant="caption" color="textSecondary">
                              {formatDistanceToNow(
                                new Date(comment.commentTimeStamp)
                              )}{" "}
                              ago
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Box>
                  )}
                </Card>
              ))
            ) : (
              <Typography>No posts available</Typography>
            )}
          </Grid>
        </Grid>

        {/* Right Section - Friends List */}

        <Grid container spacing={3} sx={{ maxWidth: "300px" }}>
          <Grid item xs={12}>
            <Card sx={{ padding: "16px", borderRadius: "12px", boxShadow: 3 }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: "8px", fontWeight: "bold" }}
              >
                Friends List
              </Typography>

              {friends.length === 0 ? (
                <Typography>No friends found</Typography>
              ) : (
                friends.map((friend) => {
                  // Determine whether to show sender or receiver as the friend

                  const isSender = friend.senderUsername !== username;

                  const friendUsername = isSender
                    ? friend.senderUsername
                    : friend.receiverUsername;

                  const friendProfilePictureUrl = isSender
                    ? friend.senderProfilePictureUrl
                    : friend.receiverProfilePictureUrl;

                  return (
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      key={friend.id}
                      sx={{ marginBottom: "10px" }}
                    >
                      <Avatar
                        src={`http://localhost:3336${friendProfilePictureUrl}`}
                        alt={friendUsername}
                        sx={{ width: 48, height: 48 }}
                      />

                      <Typography variant="body2">{friendUsername}</Typography>
                    </Stack>
                  );
                })
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserProfile;
