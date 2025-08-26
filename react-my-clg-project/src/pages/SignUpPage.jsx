// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
  Collapse,
  InputAdornment,
  IconButton,
  MenuItem,
  LinearProgress,
  CircularProgress // Added for loading state
} from '@mui/material';
import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

function SignUpPage() {
  const [step, setStep] = useState(1); // 1 for registration, 2 for OTP verification
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stream, setStream] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const getPasswordStrength = (currentPassword) => {
    let strength = 0;
    if (currentPassword.length >= 8) strength += 1;
    if (/[a-z]/.test(currentPassword)) strength += 1;
    if (/[A-Z]/.test(currentPassword)) strength += 1;
    if (/\d/.test(currentPassword)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(currentPassword)) strength += 1;

    const progressValue = (strength / 5) * 100;
    let color = 'error';
    if (strength >= 3) color = 'warning';
    if (strength >= 5) color = 'success';

    return { value: progressValue, color: color };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading for registration

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*(),.?":{}|<>).');
      setLoading(false);
      return;
    }

    if (!firstName || !lastName || !email || !stream) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      setGeneratedOtp(otpCode);
      setSuccess(`OTP sent to ${email}: ${otpCode} (for demonstration purposes). Please verify.`);
      setStep(2); // Move to OTP verification step
      setError(''); // Clear error if any before moving to next step
    } catch (apiError) {
      console.error("Error sending OTP:", apiError);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleOtpVerificationSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading for OTP verification

    if (otp.length !== 6 || isNaN(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (otp === generatedOtp) {
        // Store user data with a default role
        const userData = {
          firstName,
          lastName,
          email,
          stream,
          role: 'student', // Assign default role 'student'
          bio: 'This is an auto-generated bio. You can edit it!'
        };
        localStorage.setItem('currentUser', JSON.stringify(userData)); // Store user data after successful signup

        setSuccess('OTP verified! Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (apiError) {
      console.error("Error verifying OTP:", apiError);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading
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
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {step === 1 ? 'Create Your Account' : 'Verify Your Email'} 🚀
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

        {step === 1 && ( // Registration Form
          <Box component="form" onSubmit={handleRegistrationSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!error && !emailRegex.test(email) && email.length > 0}
              helperText={!!error && !emailRegex.test(email) && email.length > 0 ? 'Please enter a valid email address.' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              error={!!error && password.length > 0 && !passwordRegex.test(password)}
              helperText={!!error && password.length > 0 && !passwordRegex.test(password) ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*(),.?":{}|<>).' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {password.length > 0 && ( // Password strength indicator
              <LinearProgress
                variant="determinate"
                value={passwordStrength.value}
                color={passwordStrength.color}
                sx={{ mt: 1 }}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              error={!!error && confirmPassword.length > 0 && password !== confirmPassword}
              helperText={!!error && confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match.' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="stream"
              select
              label="Stream"
              name="stream"
              variant="outlined"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              disabled={loading}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
              <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
              <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
              <MenuItem value="Electronics & Communication">Electronics & Communication</MenuItem>
              <MenuItem value="Information Technology">Information Technology</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
            <MuiLink component={RouterLink} to="/login" variant="body2" sx={{ display: 'block', textAlign: 'center' }}>
              {"Already have an account? Sign In"}
            </MuiLink>
          </Box>
        )}

        {step === 2 && ( // OTP Verification Form
          <Box component="form" onSubmit={handleOtpVerificationSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              Please enter the 6-digit OTP sent to <Box component="span" sx={{ fontWeight: 'bold' }}>{email}</Box>.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="one-time-code"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              inputProps={{ maxLength: 6 }}
              disabled={loading}
              error={!!error && otp.length > 0 && (otp.length !== 6 || isNaN(otp))}
              helperText={!!error && otp.length > 0 && (otp.length !== 6 || isNaN(otp)) ? 'Please enter a valid 6-digit OTP.' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setStep(1); // Go back to registration step
                setError(''); // Clear error on step change
                setSuccess(''); // Clear success on step change
                setLoading(false); // Reset loading state
              }}
              disabled={loading}
            >
              Back to Registration
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default SignUpPage;
