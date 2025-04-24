import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Tab,
  Tabs,
  Divider,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { AccountCircle, Lock, Notifications, Security } from "@mui/icons-material";
import DashboardNavbar from "./DashboardNavbar";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [notification, setNotification] = useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    alert("Settings have been saved!");
  };

  const handleCancel = () => {
    alert("Changes have been discarded.");
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
        <DashboardNavbar/>
      </Box>
    <Box sx={{ display: "flex", marginTop:"70px" }}>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            maxWidth: 900,
            margin: "auto",
            borderRadius: 2,
            boxShadow: 4,
            backgroundColor: "#ffffff",
          }}
        >
          {/* Settings Title */}
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            Account Settings
          </Typography>

          {/* Tabs for different sections */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Settings Tabs"
            sx={{
              backgroundColor: "#f1f1f1",
              borderRadius: 2,
              marginBottom: 2,
              boxShadow: 2,
            }}
          >
            <Tab
              label="General"
              icon={<AccountCircle sx={{ fontSize: 24 }} />}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Security"
              icon={<Lock sx={{ fontSize: 24 }} />}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Notifications"
              icon={<Notifications sx={{ fontSize: 24 }} />}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Privacy"
              icon={<Security sx={{ fontSize: 24 }} />}
              sx={{ textTransform: "none" }}
            />
          </Tabs>

          <Divider sx={{ margin: "16px 0" }} />

          {/* General Settings Tab */}
          {activeTab === 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Card sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    General Information
                  </Typography>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      marginBottom: 2,
                      borderRadius: 1,
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      marginBottom: 2,
                      borderRadius: 1,
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Security Settings Tab */}
          {activeTab === 1 && (
            <Box sx={{ marginTop: 2 }}>
              <Card sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    Change Password
                  </Typography>
                  <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      marginBottom: 2,
                      borderRadius: 1,
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      borderRadius: 1,
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Notifications Settings Tab */}
          {activeTab === 2 && (
            <Box sx={{ marginTop: 2 }}>
              <Card sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    Notification Preferences
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Email Notifications"
                        select
                        fullWidth
                        value={notification}
                        onChange={(e) => setNotification(e.target.value)}
                        SelectProps={{
                          native: true,
                        }}
                        sx={{
                          marginBottom: 2,
                          backgroundColor: "#f0f0f0",
                          borderRadius: 1,
                        }}
                      >
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Privacy Settings Tab */}
          {activeTab === 3 && (
            <Box sx={{ marginTop: 2 }}>
              <Card sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    Privacy Settings
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Who can see your posts?"
                        select
                        fullWidth
                        sx={{
                          marginBottom: 2,
                          backgroundColor: "#f0f0f0",
                          borderRadius: 1,
                        }}
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="onlyMe">Only Me</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Save & Cancel Buttons */}
          <Box sx={{ marginTop: 3, textAlign: "right" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{
                marginRight: 2,
                borderRadius: 2,
                textTransform: "none",
                padding: "8px 16px",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Settings;
