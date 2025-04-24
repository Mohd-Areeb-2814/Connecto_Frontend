import React from "react";
import Sidebar from "./Sidebar";
import { Box, Grid } from "@mui/material";

const PageLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
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
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
