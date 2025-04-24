import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const PostDetails = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/post-service/posts/${postId}`
        );

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: "800px",

        margin: "0 auto",

        padding: "20px",

        backgroundColor: "#f5f5f5",

        borderRadius: 2,

        boxShadow: 3,
      }}
    >
      <Card sx={{ marginBottom: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Avatar
            src={`http://localhost:3336${post.profilePictureUrl}`}
            sx={{ width: 50, height: 50, mr: 2 }}
            alt={post.username}
          >
            {post.username.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.username}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {post.content}
          </Typography>

          {post.mediaUrl && (
            <img
              src={`http://localhost:8082/post-service${post.mediaUrl}`}
              alt="Post"
              style={{ width: "100%", borderRadius: 10 }}
            />
          )}
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Comments
      </Typography>

      {post.comments?.map((comment) => (
        <Box
          key={comment.id}
          sx={{
            display: "flex",

            alignItems: "center",

            marginBottom: 2,

            padding: 2,

            backgroundColor: "#ffffff",

            borderRadius: 2,

            boxShadow: 1,
          }}
        >
          <Avatar
            src={`http://localhost:3336${comment.profilePictureUrl}`}
            sx={{ width: 40, height: 40, mr: 2 }}
            alt={comment.username}
          >
            {comment.username.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {comment.username}
            </Typography>

            <Typography variant="body2">{comment.text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PostDetails;
