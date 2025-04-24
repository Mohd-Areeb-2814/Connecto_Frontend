import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

const FindFriends = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users when the component mounts

    axios

      .get("http://localhost:8080/api/users")

      .then((response) => {
        setUsers(response.data);
      })

      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Fetch users based on the search query

    try {
      const response = await axios.get(
        `http://localhost:8080/api/users?search=${searchQuery}`
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const handleAddFriend = (userId) => {
    // Logic for adding a friend (e.g., sending a friend request)

    console.log("Add friend:", userId);
  };

  return (
    <>
    
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h5" gutterBottom>
        Find Friends
      </Typography>

      <form onSubmit={handleSearchSubmit}>
        <TextField
          label="Search for friends"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>

      {users.length > 0 ? (
        <List>
          {users.map((user) => (
            <ListItem key={user.id} sx={{ marginTop: 2 }}>
              <ListItemText
                primary={user.name}
                secondary={`Username: ${user.username}`}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddFriend(user.id)}
              >
                Add Friend
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          No users found. Try searching with a different name.
        </Typography>
      )}
    </Container>
    </>
  );
};
export default FindFriends;
