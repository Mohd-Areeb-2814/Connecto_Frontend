import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CardContent,
  Grid2,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

import DashboardNavbar from "./DashboardNavbar";
import { Card } from "react-bootstrap";
import { Edit, Home, Info, People, PhotoLibrary } from "@mui/icons-material";
import PostListTimeline from "./PostListTimeline";
import TimelineAllFriends from "./TimelineAllFriends";
import UserImagesTimeline from "./UserImagesTimeline";

const ProfileDetails = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");

  const [firstName, setFirstName] = useState("");
  const [surname, setsurname] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Timeline");
  const [email, setEmail] = useState("");
  const [isEditingCoverPhoto, setIsEditingCoverPhoto] = useState(false);
  const [open, setOpen] = useState(false);
  // Fetch user data from the API

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
          console.log(response.data);
          setBio(response.data.bio || "");
        })

        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [refresh]);

  // Handle file selection for profile picture

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle profile picture upload

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
      formData.append("username", user.username); // Send username
      axios
        .put(
          "http://localhost:5000/user-api/v1/users/profile/update",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((response) => {
          setUser((prevUser) => ({
            ...prevUser,
            profilePictureUrl: response.data.profilePictureUrl,
          }));
          setDialogMessage("Profile picture updated successfully!");
          setDialogOpen(true);
          setRefresh((prev) => !prev); // Trigger re-render
          setIsEditingProfilePic(false);
        })

        .catch((error) => {
          console.error("Error updating profile picture:", error);
          setDialogMessage("Failed to update profile picture.");
          setDialogOpen(true);
        });
    }
  };

// file,handle for cover
  const handleCoverPhotoChange = (e) => {
    setSelectedCoverPhoto(e.target.files[0]);
  };


  //handle cover
  const handleUploadCoverPhoto = () => {
   
    if (!selectedCoverPhoto) {
      setDialogMessage("Please select a cover photo first!");
      setDialogOpen(true);
      return;
    }

   
    const token = localStorage.getItem("jwtToken");

   
    if (token && user) {
      const formData = new FormData();

      
      formData.append("image", selectedCoverPhoto); 
      formData.append("username", user.username); 

     
      axios
        .put("http://localhost:5000/user-api/v1/users/cover/update", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        })
        .then((response) => {
          setUser((prevUser) => ({
            ...prevUser,
            coverPhotoUrl: response.data.coverPhotoUrl,
          }));
          setDialogMessage("Cover photo updated successfully!");
          setDialogOpen(true);
          setIsEditingCoverPhoto(false); 
        })
        .catch((error) => {
          console.error("Error updating cover photo:", error);
          setDialogMessage("Failed to update cover photo.");
          setDialogOpen(true);
        });
    } else {
     
      setDialogMessage("User is not authenticated.");
      setDialogOpen(true);
    }
  };

  
  
  // Handle bio update

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
          bio: bio, // Send bio as a query parameter
        },
      })

      .then((response) => {
        setDialogMessage(response.data || "Bio updated successfully!");
        setDialogOpen(true);
        setIsEditingBio(false);
      })

      .catch((error) => {
        console.error("Error updating bio:", error);
        setDialogMessage("Failed to update bio.");
        setDialogOpen(true);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
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
        <Box
          style={{
            marginTop: "50px",
            backgroundColor: "#f0f2f5",
            padding: "30px",
            minHeight: "100vh",
          }}
        >
          {user && (
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              {/* Cover Photo */}
              <Box
                sx={{
                  width: "100%",
                  height: "250px",
                  backgroundImage: `url(http://localhost:3336${user.coverPhotoUrl})`, // Display the current cover photo
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                {/* Edit button to open the dialog */}
                <Button
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    zIndex: 10,
                  }}
                  onClick={() => setIsEditingCoverPhoto(true)}
                >
                  Edit Cover
                </Button>

                {/* Dialog for editing cover photo */}
                <Dialog
                  open={isEditingCoverPhoto}
                  onClose={() => setIsEditingCoverPhoto(false)}
                  aria-labelledby="edit-cover-title"
                  sx={{
                    "& .MuiDialog-paper": {
                      borderRadius: "16px",
                      padding: "20px",
                      maxWidth: "400px",
                      width: "100%",
                    },
                  }}
                >
                  <DialogTitle id="edit-cover-title">
                    Update Cover Photo
                  </DialogTitle>
                  <DialogContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* File input for selecting a cover photo */}
                    <input type="file" onChange={handleCoverPhotoChange} />

                    {/* Button to upload the new cover photo */}
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "20px", width: "100%" }}
                      onClick={handleUploadCoverPhoto}
                    >
                      Upload New Picture
                    </Button>

                    {/* Cancel button to close the dialog */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ marginTop: "10px", width: "100%" }}
                      onClick={() => setIsEditingCoverPhoto(false)}
                    >
                      Cancel
                    </Button>
                  </DialogContent>
                </Dialog>
              </Box>

              {/* Profile Picture and User Details */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  position: "relative",
                  top: "-50px",
                  marginBottom: "-50px",
                }}
              >
                {/* Profile Avatar */}
                <Avatar
                  src={`http://localhost:3336${
                    user.profilePictureUrl
                  }?timestamp=${new Date().getTime()}`}
                  alt={user.firstName}
                  sx={{
                    width: "100px",
                    height: "100px",
                    border: "3px solid #fff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    cursor: "pointer", // Make the avatar clickable
                  }}
                  onClick={handleClickOpen} // Open the dialog on click
                />

                {/* Dialog Component */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleClose} // Close the dialog on click
                      aria-label="close"
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <img
                      src={`http://localhost:3336${user.profilePictureUrl}`}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                      }}
                    />
                  </DialogContent>
                </Dialog>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: "20px",
                    marginTop: "30px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {user.firstName} {user.surname}
                  </Typography>

                  {/* icon button for editing profile picture  */}
                  <IconButton
                    aria-label="edit profile picture"
                    sx={{
                      width: "10px",
                      height: "10px",
                      position: "absolute",
                      top: "40px", // Adjust positioning below the Avatar
                      left: "-30px", // Center the icon horizontally
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      "&:hover": {
                        backgroundColor: "silver",
                      },
                    }}
                    // onClick={() => console.log("Edit Profile Picture Clicked")}
                    onClick={() => setIsEditingProfilePic(true)}
                  >
                    <Edit fontSize="small" sx={{ fontSize: "0.75rem" }} />
                  </IconButton>
                </Box>

                {/* Popup Dialog for editing profile picture */}
                <Dialog
                  open={isEditingProfilePic}
                  onClose={() => setIsEditingProfilePic(false)}
                  aria-labelledby="edit-profile-picture-title"
                  sx={{
                    "& .MuiDialog-paper": {
                      borderRadius: "16px",

                      padding: "20px",

                      maxWidth: "400px",

                      width: "100%",
                    },
                  }}
                >
                  <DialogTitle id="edit-profile-picture-title">
                    Update Profile Picture
                  </DialogTitle>

                  <DialogContent
                    sx={{
                      display: "flex",

                      flexDirection: "column",

                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={`http://localhost:3336${user.profilePictureUrl}`}
                      alt={user.firstName}
                      sx={{
                        width: "100px",

                        height: "100px",

                        marginBottom: "20px",

                        border: "3px solid #000",
                      }}
                    />

                    <Input type="file" onChange={handleFileChange} />

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "20px", width: "100%" }}
                      onClick={handleUploadPicture}
                    >
                      Upload New Picture
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ marginTop: "10px", width: "100%" }}
                      onClick={() => setIsEditingProfilePic(false)}
                    >
                      Cancel
                    </Button>
                  </DialogContent>
                </Dialog>

                {/* dialog box for editing bio \ */}
                <Dialog
                  open={isEditingBio}
                  onClose={() => setIsEditingBio(false)}
                  aria-labelledby="edit-bio-title"
                  sx={{
                    "& .MuiDialog-paper": {
                      borderRadius: "16px",
                      padding: "20px",
                      maxWidth: "400px",
                      width: "100%",
                    },
                  }}
                >
                  <DialogTitle id="edit-bio-title">Update Bio</DialogTitle>

                  <DialogContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Bio"
                      name="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      variant="outlined"
                      style={{ marginBottom: "20px" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "20px", width: "100%" }}
                      onClick={handleUpdateBio}
                    >
                      Update Bio
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ marginTop: "10px", width: "100%" }}
                      onClick={() => setIsEditingBio(false)}
                    >
                      Cancel
                    </Button>
                  </DialogContent>
                </Dialog>
              </Box>

              <AppBar
                position="sticky"
                color="default"
                elevation={1}
                sx={{
                  // marginTop: "50\px",

                  marginBottom: "12px",

                  top: 0, // Make it sticky

                  // zIndex: 1, // Ensure it stays above other content
                }}
              >
                <Toolbar sx={{ justifyContent: "center" }}>
                  {[
                    { name: "Timeline", icon: <Home /> },
                    { name: "Friends", icon: <People /> },
                    { name: "Photos", icon: <PhotoLibrary /> },
                    { name: "About", icon: <Info /> },
                  ].map((tab) => (
                    <Button
                      key={tab.name}
                      color={activeTab === tab.name ? "primary" : "inherit"}
                      onClick={() => setActiveTab(tab.name)}
                      sx={{
                        textTransform: "capitalize",
                        margin: "0 6px",
                        fontSize: "0.875rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {tab.icon}

                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {tab.name}
                      </Typography>
                    </Button>
                  ))}
                </Toolbar>
              </AppBar>
              {/* ------------------------------------------------ */}

              <Grid
                container
                spacing={2}
                sx={{ padding: "12px", minHeight: "500px" }}
              >
                {/* Left Column */}

                <Grid item xs={12} md={3}>
                  {/* Intro Section */}

                  {/* 1-1-2025 intro box */}
                  <Grid2 item xs={12} md={3}>
                    <Card sx={{ marginBottom: "12px", width: "fit-content" }}>
                      <CardContent>
                        <Typography
                          variant="body2"
                          sx={{ marginBottom: "10px", color: "blueviolet" }}
                        >
                          Introduction
                        </Typography>

                        {/* icon button for intor */}
                        <IconButton
                          aria-label="edit profile picture"
                          sx={{
                            width: "10px",
                            height: "10px",
                            position: "absolute",
                            top: "17px", // Adjust positioning below the Avatar
                            left: "100px", // Center the icon horizontally
                            backgroundColor: "#fff",
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            "&:hover": {
                              backgroundColor: "silver",
                            },
                          }}
                          // onClick={() => console.log("Edit Profile Picture Clicked")}
                          onClick={() => setIsEditingBio(true)}
                        >
                          <Edit fontSize="small" sx={{ fontSize: "0.75rem" }} />
                        </IconButton>

                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: bio ? "normal" : "italic",
                            color: bio ? "#000" : "#aaa",
                            marginBottom: "5px",
                          }}
                        >
                          {bio || "No bio added yet."}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: user.email ? "normal" : "italic",
                            color: user.email ? "#000" : "#aaa",
                            marginBottom: "5px",
                          }}
                        >
                          Email : {user.email || "No email yet."}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid2>
                </Grid>

                {/* Center Column */}

                <Grid item xs={12} md={6}>
                  {/* Timeline Section */}

                  {activeTab === "Timeline" && (
                    <>
                      <PostListTimeline />
                    </>
                  )}

                  {/* Friends Section */}

                  {activeTab === "Friends" && (
                    <Card sx={{ marginBottom: "12px" }}>
                      <CardContent sx={{ minHeight: "500px" }}>
                        <Typography variant="h6" sx={{ fontSize: "0.875rem" }}>
                          <TimelineAllFriends />
                        </Typography>
                      </CardContent>
                    </Card>
                  )}

                  {/* photo seection in bar */}
                  {activeTab === "Photos" && (
                    <Card sx={{ marginBottom: "12px" }}>
                      <CardContent sx={{ minHeight: "300px" }}>
                        <Typography variant="h6" sx={{ fontSize: "0.875rem" }}>
                          Photos
                          <UserImagesTimeline />
                        </Typography>
                      </CardContent>
                    </Card>
                  )}

                  {/* about section */}
                  {activeTab === "About" && (
                    <Card sx={{ marginBottom: "12px" }}>
                      <CardContent sx={{ minHeight: "300px" }}>
                        <Typography
                          variant="body2"
                          sx={{ marginBottom: "10px", color: "blueviolet" }}
                        >
                          About
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: bio ? "normal" : "italic",
                            color: bio ? "#000" : "#aaa",
                            marginBottom: "5px",
                          }}
                        >
                          {bio || "No bio added yet."}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: user.email ? "normal" : "italic",
                            color: user.email ? "#000" : "#aaa",
                            marginBottom: "5px",
                          }}
                        >
                          Email : {user.email || "No email yet."}
                          DOB : {user.dateOfBirth}
                        </Typography>
                        <Typography variant="body2">
                          DOB : {user.dateOfBirth}
                        </Typography>
                        <Typography variant="body2">
                          Gender : {user.gender}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>

                {/* Right Column */}

                <Grid item xs={12} md={3}>
                  <Card sx={{ marginBottom: "12px" }}>
                    <CardContent sx={{ minHeight: "300px" }}>
                      <Typography variant="h6" sx={{ fontSize: "0.875rem" }}>
                        About
                      </Typography>

                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        This section can contain more user details...
                        {/* <TimelineAllFriends/> */}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* --------------------------------------------- */}
            </Box>
          )}

          {/* Dialog for Success/Error Messages */}

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Message</DialogTitle>

            <DialogContent>
              <Typography>{dialogMessage}</Typography>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setDialogOpen(false);

                  setRefresh((prev) => !prev);
                }}
                color="primary"
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDetails;
