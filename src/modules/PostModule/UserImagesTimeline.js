import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const UserImagesTimeline = () => {
  const [posts, setPosts] = useState([]);

  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
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

        setUsername(username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/post-service/posts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const filteredPosts = response.data.filter(
          (post) => post.username === username && post.mediaUrl
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);

    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);

    setSelectedImage(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {posts.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 3, color: "gray" }}>
            No images to show.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  sx={{
                    // borderRadius: 5,

                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",

                    mb: 3,

                    width: "100%",

                    height: "100px", // Fixed height for the card

                    backgroundColor: "#ffffff",

                    border: "1px solid #e0e0e0",

                    "&:hover": {
                      transform: "scale(1.02)",

                      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                    },

                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <CardContent
                    sx={{
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {post.mediaUrl && (
                      <img
                        src={`http://localhost:8082/post-service${post.mediaUrl}`}
                        alt="Post"
                        style={{
                          width: "100%",

                          height: "100px", // Make the image cover the card

                          objectFit: "cover", // Ensure image covers the card area

                          borderRadius: 5,

                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:8082/post-service${post.mediaUrl}`
                          )
                        }
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="lg">
        <DialogTitle>Post Image</DialogTitle>

        <DialogContent>
          <img
            src={selectedImage}
            alt="Full view"
            style={{
              width: "100%",

              height: "auto",

              borderRadius: 10,

              objectFit: "contain",
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserImagesTimeline;
