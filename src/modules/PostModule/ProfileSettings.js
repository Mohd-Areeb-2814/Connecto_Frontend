import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Avatar, Box, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import { Edit, PhotoCamera, Email } from "@mui/icons-material"; // Added Email icon
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [email, setEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("http://localhost:5000/user-api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setBio(response.data.bio || "");
          setEmail(response.data.email || "");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [refresh]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file)); // Preview the image
  };

  const handleUploadPicture = () => {
    if (!selectedFile) {
      setDialogMessage("Please select a file first!");
      setDialogOpen(true);
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (token && user) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("username", user.username);

      axios
        .put("http://localhost:5000/user-api/v1/users/profile/update", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setUser((prevUser) => ({
            ...prevUser,
            profilePictureUrl: response.data.profilePictureUrl,
          }));
          setDialogMessage("Profile picture updated successfully!");
          setDialogOpen(true);
          setRefresh((prev) => !prev);
          setIsEditingProfilePic(false); // Close the profile picture editor
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
          setDialogMessage("Failed to update profile picture.");
          setDialogOpen(true);
        });
    }
  };

  const handleUpdateBio = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setDialogMessage("User is not authenticated");
      setDialogOpen(true);
      return;
    }

    axios
      .put("http://localhost:5000/user-api/v1/users/bio/update", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          bio,
        },
      })
      .then((response) => {
        setDialogMessage("Bio updated successfully!");
        setDialogOpen(true);
        setIsEditingBio(false); // Close the bio editor
      })
      .catch((error) => {
        console.error("Error updating bio:", error);
        setDialogMessage("Failed to update bio.");
        setDialogOpen(true);
      });
  };

 

  const handleUpdateEmail = () => {
    const token = localStorage.getItem("jwtToken");

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|in)$/;
    if (!emailRegex.test(email)) {
      setDialogMessage("Invalid email format. Please enter a valid email.");
      setDialogOpen(true);
      return;
    }

    if (!token) {
      setDialogMessage("User is not authenticated");
      setDialogOpen(true);
      return;
    }

    axios
      .put(
        "http://localhost:5000/user-api/v1/users/updateEmail",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((response) => {
        setDialogMessage(response.data || "Email updated successfully!");
        setDialogOpen(true);
        setIsEditingEmail(false);
      })

      .catch((error) => {
        console.error("Error updating email:", error);
        setDialogMessage("Failed to update email.");
        setDialogOpen(true);
      });
  };

  return (
    <>
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

      <Box sx={{ display: "flex", marginTop: "70px" }}>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content on the right */}
        <Box
          sx={{
            flexGrow: 1,
            padding: "16px",
            backgroundColor: "#f7f7f7",
            minHeight: "100vh",
          }}
        >
          <Box sx={{ padding: 5, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold", color: "#333" }}>
              Profile Settings
            </Typography>

            {/* Profile Picture Section */}
            {user && (
              <Card sx={{ marginBottom: 4, boxShadow: 2, borderRadius: "16px" }}>
                <CardContent>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        marginBottom: 2,
                        border: "2px solid #fff",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                      src={imagePreview ? imagePreview : `http://localhost:3336${user.profilePictureUrl}`}
                      alt="Profile Picture"
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsEditingProfilePic(true)}
                      startIcon={<PhotoCamera />}
                      sx={{
                        marginBottom: 2,
                        borderRadius: "20px",
                        padding: "6px 20px",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#f2f2f2" },
                      }}
                    >
                      Edit Picture
                    </Button>
                    {isEditingProfilePic && (
                      <Box sx={{ textAlign: "center" }}>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="profile-picture"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="profile-picture">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            sx={{
                              borderRadius: "20px",
                              padding: "6px 20px",
                              fontWeight: "bold",
                            }}
                          >
                            Choose New Picture
                          </Button>
                        </label>
                        <Button
                          variant="contained"
                          onClick={handleUploadPicture}
                          sx={{
                            marginLeft: 2,
                            borderRadius: "20px",
                            padding: "6px 20px",
                            fontWeight: "bold",
                          }}
                        >
                          Save Picture
                        </Button>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}

    
            {/* Bio Section */}
            <Card sx={{ marginBottom: 4, boxShadow: 2, borderRadius: "16px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#555" }}>Bio</Typography>
                {!isEditingBio ? (
                  <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "16px", color: "#333" }}>
                    {bio || "No bio available."}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    multiline
                    rows={4}
                    sx={{
                      marginBottom: 2,
                      borderRadius: "15px",
                      backgroundColor: "#fff",
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    marginTop: 1,
                  }}
                  onClick={() => {
                    isEditingBio ? handleUpdateBio() : setIsEditingBio(true);
                  }}
                >
                  {isEditingBio ? "Save" : "Edit"}
                </Button>
              </CardContent>
            </Card>

            {/* Email Section */}
            <Card sx={{ marginBottom: 4, boxShadow: 2, borderRadius: "16px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#555" }}>Email</Typography>
                {!isEditingEmail ? (
                  <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "16px", color: "#333" }}>
                    {email || "No email available."}
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      marginBottom: 2,
                      borderRadius: "15px",
                      backgroundColor: "#fff",
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    marginTop: 1,
                  }}
                  onClick={() => {
                    isEditingEmail ? handleUpdateEmail() : setIsEditingEmail(true);
                  }}
                >
                  {isEditingEmail ? "Save" : "Edit"}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "Black" }}>
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileSettings;
