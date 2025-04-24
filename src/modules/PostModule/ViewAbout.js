import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import Sidebar from './Sidebar'
import { Box, Typography } from '@mui/material'
import UserImagesTimeline from './UserImagesTimeline'
import TimelineAllFriends from './TimelineAllFriends'

const ViewFriends = () => {
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
        <Box sx={{ padding: 5, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, maxWidth: "800px", margin: "auto" ,minHeight:"600px"}}>
          <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold", color: "#333" }}>
            About
          </Typography>
          
          

        </Box>
      </Box>
    </Box>

   
  </>
  )
}

export default ViewFriends
