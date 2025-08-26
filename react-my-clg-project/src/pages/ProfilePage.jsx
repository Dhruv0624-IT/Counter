import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress, // For loading state
  Alert,          // For success/error messages
  Collapse,       // For animated alerts
} from '@mui/material';
import {
  AccountCircle,
  Edit as EditIcon, // Icon for Edit button
  Save as SaveIcon,   // Icon for Save button
  Cancel as CancelIcon, // Icon for Cancel button
  Login as LoginIcon // Icon for login prompt
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Initialize as null to indicate loading/no user
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null); // Also null initially
  const [loading, setLoading] = useState(false); // For save operation
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Helper function to generate a dummy student ID
  const generateStudentId = () => {
    const prefix = "CLG2025";
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomNum}`;
  };

  // Helper function to get initials for avatar
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}` || ''; // Ensure it returns an empty string if both are empty
  };

  // Function to load and parse user data
  const loadUserData = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);

        // Define default values if not present in parsedUser
        const finalStudentId = parsedUser.role === 'student' && !parsedUser.studentId
          ? generateStudentId()
          : parsedUser.studentId || 'N/A'; // For non-students, or if studentId is simply missing
        const initialBio = parsedUser.bio || 'This is an auto-generated bio. Click "Edit Profile" to customize it!';
        const finalFirstName = parsedUser.firstName || 'Guest';
        const finalLastName = parsedUser.lastName || 'User';
        const finalStream = parsedUser.stream || 'Not Set';
        const finalEmail = parsedUser.email || '';

        const userWithDefaults = {
          ...parsedUser,
          firstName: finalFirstName,
          lastName: finalLastName,
          email: finalEmail,
          studentId: finalStudentId,
          stream: finalStream,
          bio: initialBio,
          avatarUrl: parsedUser.avatarUrl || '', // Ensure avatarUrl is set even if empty
        };

        setUser(userWithDefaults);
        setEditedUser(userWithDefaults); // Initialize editedUser with current user data
      } catch (e) {
        console.error("Failed to parse loggedInUser from localStorage in ProfilePage:", e);
        // If parsing fails, treat as no user logged in
        setUser(null);
        setEditedUser(null);
        localStorage.removeItem('loggedInUser'); // Clear corrupted data
      }
    } else {
      setUser(null); // No logged-in user
      setEditedUser(null);
    }
  };

  useEffect(() => {
    loadUserData(); // Load data on initial mount

    // Listen for storage changes (e.g., login/logout from Header)
    window.addEventListener('storage', loadUserData);

    return () => {
      window.removeEventListener('storage', loadUserData);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const handleEditClick = () => {
    setSuccess('');
    setError('');
    setIsEditing(true);
    setEditedUser({ ...user }); // Ensure editedUser is a fresh copy of current user data
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setSuccess('');
    setError('');

    // Basic validation for demonstration
    if (!editedUser.firstName || !editedUser.lastName || !editedUser.stream) {
      setError('First Name, Last Name, and Stream cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to save profile (e.g., to a backend database)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you'd send `editedUser` to your backend.
      // For this simulation, we update localStorage.
      localStorage.setItem('loggedInUser', JSON.stringify(editedUser)); // Update loggedInUser in localStorage
      setUser(editedUser); // Update the displayed user state
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      console.log("Profile saved:", editedUser);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setSuccess('');
    setError('');
    setIsEditing(false);
    setEditedUser({ ...user }); // Revert editedUser to current user's state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Render logic for when no user is logged in
  if (user === null || user.email === '') { // Also check for empty email which might indicate default guest
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 8, textAlign: 'center', p: 4, borderRadius: 2, bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
          <LoginIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1e88e5', fontWeight: 'medium' }}>
            Please log in to view your profile.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You need to be signed in to access your personalized profile page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            startIcon={<LoginIcon />}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  // Actual Profile Page rendering
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Your Profile 👤
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 3, width: '100%', maxWidth: 600, borderRadius: '12px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src={user.avatarUrl}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '3px solid #1976d2', // Thicker border
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                fontSize: '3rem',
                boxShadow: 2, // Add shadow to avatar
              }}
            >
              {user.avatarUrl ? null : (getInitials(user.firstName, user.lastName) || <AccountCircle sx={{ fontSize: 80 }} />)}
            </Avatar>
            <Typography variant="h5" component="h2" gutterBottom>
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.stream || 'Stream Not Set'} | {user.studentId}
            </Typography>
          </Box>

          {/* Alerts for success/error messages */}
          <Collapse in={!!success} sx={{ width: '100%', mb: 2 }}>
            <Alert severity="success" onClose={() => setSuccess('')}>
              {success}
            </Alert>
          </Collapse>
          <Collapse in={!!error} sx={{ width: '100%', mb: 2 }}>
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          </Collapse>

          <Grid container spacing={2} component="form" sx={{ width: '100%' }}>
            {/* Email Field - Always Read-Only */}
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={user.email} // Always display from 'user' state as it's readOnly
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>

            {/* First Name Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={isEditing ? editedUser.firstName : user.firstName}
                onChange={handleChange}
                InputProps={{ readOnly: !isEditing }}
                variant="outlined"
                disabled={loading}
              />
            </Grid>

            {/* Last Name Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={isEditing ? editedUser.lastName : user.lastName}
                onChange={handleChange}
                InputProps={{ readOnly: !isEditing }}
                variant="outlined"
                disabled={loading}
              />
            </Grid>

            {/* Stream Field */}
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="stream"
                label="Stream/Major"
                name="stream"
                value={isEditing ? editedUser.stream : user.stream}
                onChange={handleChange}
                InputProps={{ readOnly: !isEditing }}
                variant="outlined"
                disabled={loading}
              />
            </Grid>

            {/* Student ID Field - Always Read-Only */}
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="studentId"
                label="Student ID"
                name="studentId"
                value={user.studentId} // Always display from 'user' state as it's readOnly
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>

            {/* Bio Field */}
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                value={isEditing ? editedUser.bio : user.bio}
                onChange={handleChange}
                multiline
                rows={3}
                InputProps={{ readOnly: !isEditing }}
                variant="outlined"
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveClick}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelClick}
                  disabled={loading}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditClick}
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ProfilePage;
