import React, { useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";

import { MoreVert } from "@mui/icons-material";

const MenuComponent = ({ onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            onDelete();

            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuComponent;
