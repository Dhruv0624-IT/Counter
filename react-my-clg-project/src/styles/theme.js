import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Red
    },
    info: {
      main: '#2196f3', // Light Blue
    },
    success: {
      main: '#4caf50', // Green
    },
    warning: {
      main: '#ff9800', // Orange
    },
    error: {
      main: '#f44336', // Red
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Apply rounded corners to all buttons
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Apply rounded corners to Paper components
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Default TextField variant
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Apply rounded corners to TextField inputs
          },
        },
      },
    },
    MuiCard: { // Assuming DashboardCard uses MuiCard internally
      styleOverrides: {
        root: {
          borderRadius: 12, // Apply rounded corners to cards
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow for depth
        },
      },
    },
  },
});

export default theme;
