import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link as MuiLink,
  Avatar,
  Alert,
  Collapse,
  InputAdornment,
  IconButton,
  CircularProgress, // Added for loading state
} from '@mui/material';
import {
  LockOutlined
} from '@mui/icons-material';
import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Password validation based on your regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*(),.?":{}|<>).');
      setLoading(false);
      return;
    }

    // Simulate API call delay for authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    let userToLogin = null;
    const defaultPassword = 'MyP@ssw0rd1!'; // Define a default password for simulation

    // Step 1: Check for special admin/faculty emails with the default password
    if (email === 'admin@example.com') {
      if (password === defaultPassword) {
        userToLogin = {
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          stream: 'N/A',
          bio: 'System Administrator Account'
        };
      }
    } else if (email === 'faculty@example.com') {
      if (password === defaultPassword) {
        userToLogin = {
          email: 'faculty@example.com',
          firstName: 'Faculty',
          lastName: 'Member',
          role: 'faculty',
          stream: 'Computer Science',
          bio: 'Faculty Member Account'
        };
      }
    } else {
      // Step 2: If not a special email, check localStorage for a registered user
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // In a real application, passwords would be hashed and compared securely
          if (email === parsedUser.email && password === defaultPassword) { // Simulate successful password match
            userToLogin = parsedUser;
          }
        } catch (e) {
          console.error("Error parsing stored user from localStorage:", e);
          // Don't set error here, as it might expose internal state.
          // The "Invalid email or password" message below will cover it.
        }
      }
    }

    // Final check and redirection
    if (userToLogin) {
      localStorage.setItem('loggedInUser', JSON.stringify(userToLogin));
      setSuccess('Login successful! Redirecting to Dashboard...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError('Invalid email or password. Please check your credentials or sign up.');
    }

    setLoading(false); // Stop loading after all checks
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Sign In
        </Typography>

        {/* Display Alert messages */}
        <Collapse in={!!error} sx={{ width: '100%', mb: 2 }}>
          <Alert severity="error" onClose={() => setError('')}> {/* Added onClose */}
            {error}
          </Alert>
        </Collapse>
        <Collapse in={!!success} sx={{ width: '100%', mb: 2 }}>
          <Alert severity="success" onClose={() => setSuccess('')}> {/* Added onClose */}
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
            disabled={loading} // Disable while loading
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Only show error text for password field if there's a general error
            // and the password field has content or has been interacted with.
            error={!!error && password.length > 0}
            helperText={!!error && password.length > 0 ? error : ''}
            disabled={loading} // Disable while loading
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    disabled={loading} // Disable toggle while loading
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
          <MuiLink component={RouterLink} to="/signup" variant="body2" sx={{ display: 'block', textAlign: 'center' }}>
            {"Don't have an account? Sign Up"}
          </MuiLink>
          <MuiLink component={RouterLink} to="/forgot-password" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
            Forgot password?
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
