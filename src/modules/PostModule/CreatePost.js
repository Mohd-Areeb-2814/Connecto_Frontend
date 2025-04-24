import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Button,
  TextField,
  Container,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import DashboardNavbar from "./DashboardNavbar";
const CreatePost = () => {
  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const [privacy, setPrivacy] = useState("public");

  const [username, setUsername] = useState(""); // Initially empty, will be set by logged-in user data

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user's details from local storage or an API endpoint

    const token = localStorage.getItem("jwtToken"); // Assuming JWT is stored in localStorage

    if (token) {
      axios

        .get("http://localhost:5000/user-api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((response) => {
          setUsername(response.data.username); // Set the logged-in user's username
        })

        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Capture the selected image
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("User not logged in");

      return;
    }

    const formData = new FormData();

    formData.append("username", username);

    formData.append("content", content);

    formData.append("privacy", privacy);

    if (image) {
      formData.append("image", image); // Append image to formData
    }

    try {
      await axios.post("http://localhost:5000/post-service/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data", // Tell backend it's a file upload
        },
      });

      alert("Post created successfully!");

      navigate("/feed");
    } catch (error) {
      console.error("Error creating post:", error);

      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <>
      <DashboardNavbar />

      <Container maxWidth="sm">
        <Card sx={{ marginTop: 5, padding: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create a Post
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="privacy-label">Privacy</InputLabel>

              <Select
                labelId="privacy-label"
                value={privacy}
                onChange={handlePrivacyChange}
                label="Privacy"
              >
                <MenuItem value="public">Public</MenuItem>

                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>

            {/* Image Upload */}

            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ marginBottom: 10 }}
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                width="100%"
                style={{ marginBottom: 10 }}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Post
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default CreatePost;
