import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  IconButton,
  Divider,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Send, ThumbUp, MoreVert, Comment } from "@mui/icons-material";
import DashboardNavbar from "./DashboardNavbar";
import CreatePostButton from "./CreatePostButton";
import MenuComponent from "./MenuComponent";
import Sidebar from "./Sidebar";
import PostListFriends from "./PostListFriends";
 
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [commentInputVisible, setCommentInputVisible] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
 
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
 
        const { username, profilePictureUrl } = response.data;
        setUsername(username);
        setProfilePictureUrl(profilePictureUrl);
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
 
        const enrichedPosts = await Promise.all(
          response.data.map(async (post) => {
            const commentResponse = await axios.get(
              `http://localhost:5000/post-service/api/comments`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                params: { postId: post.id },
              }
            );
 
            const sortedComments = commentResponse.data.sort(
              (a, b) =>
                new Date(b.commentTimeStamp) - new Date(a.commentTimeStamp)
            );
 
            return {
              ...post,
              comments: sortedComments,
            };
          })
        );
 
        const sortedPosts = enrichedPosts.sort(
          (a, b) => new Date(b.postTimeStamp) - new Date(a.postTimeStamp)
        );
 
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
 
    fetchPosts();
  }, []);
 
  const handleAddComment = (postId, commentText) => {
    axios
      .post("http://localhost:5000/post-service/api/comments/add", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        params: { postId, username, text: commentText },
      })
      .then((response) => {
        const newComment = response.data;
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    { ...newComment, username, profilePictureUrl },
                  ],
                }
              : post
          )
        );
      })
      .catch((error) => console.error("Error adding comment:", error));
  };
 
  const handleDeleteComment = (postId, commentId) => {
    axios
      .delete(`http://localhost:5000/post-service/api/comments/deleteComment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        params: { postId, commentId, username },
      })
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.filter(
                    (comment) => comment.id !== commentId
                  ),
                }
              : post
          )
        );
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };
 
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/post-service/likes/toggle",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          params: { postId, username },
        }
      );
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
     
                  likedbyuser: !post.likedByUser,
     
                  likesCount:
                    response.data === "post like successfull"
                      ? post.likesCount + 1
                      : post.likesCount - 1,
                }
              : post
          )
        );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
 
  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };
 
  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setCurrentPostId(postId);
  };
 
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentPostId(null);
  };
 
  const handleDeletePost = () => {
    axios
      .delete(
        `http://localhost:5000/post-service/posts/${username}/${currentPostId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then(() => {
        handlePostDeleted(currentPostId);
        handleMenuClose();
      })
      .catch((error) => console.error("Error deleting post:", error));
  };
 
  const toggleCommentsVisibility = (postId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
 
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
 
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              marginTop: "90px",
              borderRadius: "10px",
              marginLeft: "10px",
              height: "maxHeight",
              display: "flex",
            }}
          >
            <Sidebar />
          </Box>
        </Grid>
 
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
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
 
          <CreatePostButton />
 
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
                marginTop: "135px",
              }}
            >
              {posts.length === 0 ? (
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mt: 3, color: "gray" }}
                >
                  No posts to show. Create a new post to see it here!
                </Typography>
              ) : (
                posts.map((post) => (
                  <Card
                    key={post.id}
                    sx={{
                      borderRadius: 5,
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      mb: 3,
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                      },
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                      <Avatar
                        src={`http://localhost:3336${post.profilePictureUrl}`}
                        sx={{
                          bgcolor : "#3f51b5",
                          mr: 2,
                          width: 50,
                          height: 50,
                        }}
                      >
                        {post.username.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ color: "#3f51b5" }}
                        >
                          {post.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {formatDistanceToNow(new Date(post.postTimeStamp))}{" "}
                          ago
                        </Typography>
                      </Box>
                      {post.username === username && (
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, post.id)}
                          sx={{ marginLeft: "auto" }}
                        >
                          <MoreVert />
                        </IconButton>
                      )}
                    </Box>
                    <Divider />
                    <CardContent>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {post.content}
                      </Typography>
                      {post.mediaUrl && (
                        <img
                          src={` http://localhost:8082/post-service${post.mediaUrl}`}
                          alt="Post"
                          style={{
                            width: "100%",
                            borderRadius: 10,
                            maxHeight: 400,
                            objectFit: "cover",
                            border: "1px solid #e0e0e0",
                          }}
                        />
                      )}
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                      <IconButton
                        onClick={() => handleLike(post.id)}
                        sx={{
                          backgroundColor: "#f0f2f5",
                          "&:hover": {
                            backgroundColor: "#e7f3ff",
                          },
                        }}
                      >
                        <ThumbUp
                          sx={{
                            color: post.likedByUser  ? "#1877f2" : "#757575",
                          }}
                        />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 1,
                          color: "#757575",
                          fontWeight: "bold",
                        }}
                      >
                        {post.likesCount}{" "}
                        {post.likesCount === 1 ? "Like" : "Likes"}
                      </Typography>
                      <IconButton
                        onClick={() => toggleCommentsVisibility(post.id)}
                        sx={{
                          ml: 2,
                        }}
                      >
                        <Comment />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 1,
                          color: "#1877F2",
                          fontWeight: "bold",
                        }}
                      >
                        {post.comments.length}{" "}
                        {post.comments.length === 1 ? "Comment" : "Comments"}
                      </Typography>
                    </Box>
                    {commentsVisible[post.id] && (
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Comments:
                        </Typography>
                        {post.comments.length > 0 ? (
                          post.comments.map((comment) => (
                            <Box
                              key={comment.id}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                                padding: "5px 10px",
                                backgroundColor: "#f9f9f9",
                                borderRadius: "10px",
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Avatar
                                  sx={{
                                    mr: 1,
                                    width: 35,
                                    height: 35,
                                    alignSelf: "flex-start",
                                  }}
                                >
                                  {comment.profilePictureUrl ? (
                                    <img
                                      src={`http://localhost:3336${comment.profilePictureUrl}`}
                                      alt={comment.username}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  ) : (
                                    comment.username.charAt(0).toUpperCase()
                                  )}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#3f51b5",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {comment.username}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{ color: "#2c2c2c" }}
                                  >
                                    {comment.text}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
 >
                                    {formatDistanceToNow(
                                      new Date(comment.commentTimeStamp)
                                    )}{" "}
                                    ago
                                  </Typography>
                                </Box>
                              </Box>
                              {comment.username === username && (
                                <MenuComponent
                                  onDelete={() =>
                                    handleDeleteComment(post.id, comment.id)
                                  }
                                />
                              )}
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No comments yet.
                          </Typography>
                        )}
                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 2 }}
                        >
                          <TextField
                            id={`comment-input-${post.id}`}
                            variant="outlined"
                            size="small"
                            placeholder="Add a comment..."
                            sx={{
                              flexGrow: 1,
                              mr: 1,
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "20px",
                              },
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.target.value.trim()) {
                                handleAddComment(
                                  post.id,
                                  e.target.value.trim()
                                );
                                e.target.value = "";
                              }
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              const inputElement = document.getElementById(
                                `comment-input-${post.id}`
                              );
                              const commentText = inputElement.value.trim();
                              if (commentText) {
                                handleAddComment(post.id, commentText);
                                inputElement.value = "";
                              }
                            }}
                            sx={{
                              backgroundColor: "#3f51b5",
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "#303f9f",
                              },
                            }}
                          >
                            <Send />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </Card>
                ))
              )}
            </Box>
          </Grid>
        </Box>
 
        <Grid item xs={3}>
          <Box
            sx={{
              marginTop: "90px",
              height: "400px",
              borderRadius: "10px",
              marginRight: "10px",
              border: "1px solid #e0e0e0",
              display: "flex",
            }}
          >
            <PostListFriends />
          </Box>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
      </Menu>
    </>
  );
};
 
export default PostList;