// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Helper function to parse user from localStorage
  const getUserRoleFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        return parsedUser && parsedUser.role ? parsedUser.role : null;
      } catch (e) {
        console.error("Failed to parse loggedInUser from localStorage:", e);
        localStorage.removeItem('loggedInUser'); // Clear invalid data
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // Set initial user role
    setUserRole(getUserRoleFromLocalStorage());

    // Event listener for changes in localStorage from other tabs/windows
    const handleStorageChange = () => {
      setUserRole(getUserRoleFromLocalStorage());
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('currentUser'); // Assuming 'currentUser' is also used for login state
    setUserRole(null); // Clear the role in state
    navigate('/login'); // Navigate using react-router-dom for a smooth transition
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
          My College Project
        </Typography>

        <Button color="inherit" component={RouterLink} to="/" sx={{ color: 'white' }}>
          Dashboard
        </Button>
        <Button color="inherit" component={RouterLink} to="/profile" sx={{ color: 'white' }}>
          Profile
        </Button>
        {/* Only show Login button if no user role is set (i.e., not logged in) */}
        {!userRole && (
          <Button color="inherit" component={RouterLink} to="/login" sx={{ color: 'white' }}>
            Login
          </Button>
        )}
        {userRole === 'admin' && (
          <Button color="inherit" component={RouterLink} to="/admin-dashboard" sx={{ color: 'white' }}>
            Admin Dashboard
          </Button>
        )}
        {/* Show Logout button if any user role is set (i.e., logged in) */}
        {userRole && (
          <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
