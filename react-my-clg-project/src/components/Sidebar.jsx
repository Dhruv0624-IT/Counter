// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountCircle as ProfileIcon,
  School as StudentIcon,
  People as FacultyIcon,
  Assignment as AssignmentIcon,
  FolderOpen as FilesIcon,
  CalendarMonth as CalendarIcon,
  UploadFile as UploadIcon,
  Settings as SettingsIcon,
  Group as UserManagementIcon,
  Assessment as AnalyticsIcon,
  Shield as ModerationIcon
} from '@mui/icons-material';

// Role-based navigation config
const NAV_ITEMS = {
  common: [
    { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: 'Profile', path: '/profile', icon: <ProfileIcon /> }
  ],
  student: [
    { text: 'My Courses', path: '/student-courses', icon: <StudentIcon /> },
    { text: 'Assignments', path: '/student-assignments', icon: <AssignmentIcon /> },
    { text: 'Calendar', path: '/student-calendar', icon: <CalendarIcon /> }
  ],
  faculty: [
    { text: 'My Taught Courses', path: '/faculty-courses', icon: <FacultyIcon /> },
    { text: 'Student Submissions', path: '/faculty-submissions', icon: <FilesIcon /> },
    { text: 'Upload Materials', path: '/faculty-upload', icon: <UploadIcon /> }
  ],
  admin: [
    { text: 'User Management', path: '/admin-users', icon: <UserManagementIcon /> },
    { text: 'System Analytics', path: '/admin-analytics', icon: <AnalyticsIcon /> },
    { text: 'File Moderation', path: '/admin-moderation', icon: <ModerationIcon /> },
    { text: 'Settings', path: '/admin-settings', icon: <SettingsIcon /> }
  ],
  guest: [
    { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { text: 'Login / Register', path: '/login', icon: <ProfileIcon /> }
  ]
};

function Sidebar() {
  const [userRole, setUserRole] = useState('guest');
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role || 'guest');
        setUserName(`${parsedUser.firstName} ${parsedUser.lastName}`.trim() || 'Guest');
      } catch {
        localStorage.removeItem('loggedInUser');
        setUserRole('guest');
        setUserName('Guest');
      }
    }
  }, []);

  // Determine menu items
  const menuItems =
    userRole === 'student'
      ? [...NAV_ITEMS.common, ...NAV_ITEMS.student]
      : userRole === 'faculty'
      ? [...NAV_ITEMS.common, ...NAV_ITEMS.faculty]
      : userRole === 'admin'
      ? [...NAV_ITEMS.common, ...NAV_ITEMS.admin]
      : NAV_ITEMS.guest;

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#2c3e50',
        color: 'white',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
        boxShadow: 3,
        py: 2
      }}
    >
      {/* User Info */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#ecf0f1', mb: 1 }}>
          {userName}
        </Typography>
        <Typography variant="body2" sx={{ color: '#bdc3c7', textTransform: 'capitalize' }}>
          {userRole}
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

      {/* Navigation Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                py: 1.2
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1" sx={{ color: 'white' }}>{item.text}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
