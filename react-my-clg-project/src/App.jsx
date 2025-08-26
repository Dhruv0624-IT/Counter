// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Typography,
  Link as MuiLink,
  CircularProgress
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Theme
import theme from './styles/theme';

// Routes array
import routes from './routes';

// Placeholder pages (can be replaced with real files later)
const PlaceholderPage = ({ title, text }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="body1">{text}</Typography>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Header />

        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <Suspense
              fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                  <Typography variant="h6" sx={{ ml: 2 }}>Loading Page...</Typography>
                </Box>
              }
            >
              <Routes>
                {/* Load routes dynamically */}
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}

                {/* 404 Page */}
                <Route
                  path="*"
                  element={
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                      <Typography variant="h4" color="error">404 - Page Not Found</Typography>
                      <Typography variant="body1">The page you are looking for does not exist.</Typography>
                      <MuiLink component={RouterLink} to="/" underline="hover">
                        Go to Dashboard
                      </MuiLink>
                    </Box>
                  }
                />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
