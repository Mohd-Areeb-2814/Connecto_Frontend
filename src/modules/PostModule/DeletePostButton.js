import React from "react";

import axios from "axios";

import { IconButton, Menu, MenuItem } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const DeletePostButton = ({ postId, onPostDeleted }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/post-service/posts/${postId}`,
        { headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },

        }
       
      );

      console.log("Post deleted successfully:", response);

      onPostDeleted(postId); // Call the parent function to update the post list
    } catch (error) {
      console.error("Error deleting post:", error);
    }

    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ position: "absolute", top: 8, left: 40 }}
      >
        <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
      </Menu>
    </>
  );
};

export default DeletePostButton;
