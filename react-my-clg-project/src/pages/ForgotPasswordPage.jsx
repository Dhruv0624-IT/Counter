import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Link as MuiLink, Alert, Collapse, Avatar, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LockResetOutlined } from '@mui/icons-material';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    setLoading(true); // Start loading

    // Basic email validation (you can enhance this regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false); // Stop loading if validation fails
      return;
    }

    // Simulate sending a reset link to a backend API
    // In a real application, you would make a fetch or axios call here
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Simulating sending reset link to:", email);
      setSuccess(`A password reset link has been sent to ${email}. Please check your inbox.`);
      setEmail(''); // Clear the email field after successful send

      // Optionally, clear the success message after a few seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);

    } catch (apiError) {
      // In a real application, you would handle actual API errors here
      console.error("Error sending reset link:", apiError);
      setError('Failed to send reset link. Please try again later.');
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3, // Added padding for better spacing within the box
          borderRadius: 2, // Rounded corners
          boxShadow: 3, // Subtle shadow for depth
          bgcolor: 'background.paper', // Use theme background color
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockResetOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
          Enter your email address below and we'll send you a link to reset your password.
        </Typography>

        {/* Display Alert messages */}
        <Collapse in={!!error} sx={{ width: '100%', mb: 2 }}>
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Collapse>
        <Collapse in={!!success} sx={{ width: '100%', mb: 2 }}>
          <Alert severity="success" onClose={() => setSuccess('')}>
            {success}
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error} // Show error state if there's an error
            helperText={error || ''} // Display the error message, or empty string to avoid layout shift
            disabled={loading} // Disable input while loading
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
          </Button>
          <MuiLink component={RouterLink} to="/login" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
            Back to Login
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPasswordPage;
