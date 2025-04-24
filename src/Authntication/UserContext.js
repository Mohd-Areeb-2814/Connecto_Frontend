import React, { createContext, useState, useEffect } from "react";

import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null); // Store user details 12-18-2024

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user-api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
            },
          }
        );

        setUserDetails(response.data); // Save fetched user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, loading }}>
      {children}
    </UserContext.Provider>
  );
};
