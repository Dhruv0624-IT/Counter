// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { AccessTime, Assignment, FolderOpen, Notifications, Group, CloudUpload } from '@mui/icons-material';

// Import the DashboardCard component from your components folder
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Function to parse user data from localStorage
    const parseUserData = () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        try {
          const parsedUser = JSON.parse(loggedInUser);
          if (parsedUser && parsedUser.role) {
            setUserRole(parsedUser.role);
            setUserName(`${parsedUser.firstName} ${parsedUser.lastName}`);
          } else {
            // If user object is malformed or role is missing
            setUserRole(null);
            setUserName('Guest');
            localStorage.removeItem('loggedInUser'); // Clear invalid data
          }
        } catch (e) {
          // Handle JSON parsing errors
          console.error("Failed to parse loggedInUser from localStorage:", e);
          setUserRole(null);
          setUserName('Guest');
          localStorage.removeItem('loggedInUser'); // Clear corrupted data
        }
      } else {
        // No loggedInUser in localStorage
        setUserRole(null);
        setUserName('Guest');
      }
    };

    // Initial load of user data
    parseUserData();

    // Set up a listener for storage changes (e.g., login/logout from another tab)
    window.addEventListener('storage', parseUserData);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', parseUserData);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  // Student Dashboard Layout
  const renderStudentDashboard = () => (
    <Grid container spacing={4}>
      {/* Welcome Message for Student */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
          Welcome, {userName}! Your Student Dashboard. 🎓
        </Typography>
      </Grid>

      {/* Recent Activity Card for Student */}
      <Grid item xs={12} md={6} lg={4}>
        <DashboardCard
          icon={Notifications}
          iconColor="primary"
          title="Recent Activity"
          content={
            <>
              <Typography variant="body2" color="text.secondary">
                - New assignment "Project Proposal" due next week.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Your grade for "Midterm Exam" is now available.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Dr. Smith posted a new announcement.
              </Typography>
            </>
          }
          actionText="View All Activities"
          onActionClick={() => console.log('View All Activities clicked')} // Placeholder action
        />
      </Grid>

      {/* Upcoming Deadlines Card for Student */}
      <Grid item xs={12} md={6} lg={4}>
        <DashboardCard
          icon={AccessTime}
          iconColor="secondary"
          title="Upcoming Deadlines"
          content={
            <>
              <Typography variant="body2" color="text.secondary">
                - 📅 **Aug 15:** Project Proposal (Software Engineering)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - 📝 **Aug 20:** Homework 3 (Calculus I)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - 📚 **Sep 1:** Research Paper Draft (History)
              </Typography>
            </>
          }
          actionText="View Calendar"
          onActionClick={() => console.log('View Calendar clicked')} // Placeholder action
        />
      </Grid>

      {/* My Courses Card for Student */}
      <Grid item xs={12} md={6} lg={4}>
        <DashboardCard
          icon={Assignment}
          iconColor="info"
          title="My Courses"
          content={
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                You are currently enrolled in:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Software Engineering
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Calculus I
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - History
              </Typography>
            </>
          }
          actionText="Go to Courses"
          onActionClick={() => console.log('Go to Courses clicked')} // Placeholder action
        />
      </Grid>
    </Grid>
  );

  // Faculty Dashboard Layout
  const renderFacultyDashboard = () => (
    <Grid container spacing={4}>
      {/* Welcome Message for Faculty */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#004d40', fontWeight: 'bold' }}>
          Welcome, {userName}! Your Faculty Dashboard. 👩‍🏫
        </Typography>
      </Grid>

      {/* Courses Taught Card for Faculty */}
      <Grid item xs={12} md={6}>
        <DashboardCard
          icon={Assignment}
          iconColor="primary"
          title="My Courses Taught"
          content={
            <>
              <Typography variant="body2" color="text.secondary">
                - Software Engineering (Fall 2025)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Data Structures (Spring 2026)
              </Typography>
            </>
          }
          actionText="Manage Courses"
          onActionClick={() => console.log('Manage Courses clicked')} // Placeholder action
        />
      </Grid>

      {/* Student Submissions Card for Faculty */}
      <Grid item xs={12} md={6}>
        <DashboardCard
          icon={FolderOpen}
          iconColor="secondary"
          title="Student Submissions"
          content={
            <>
              <Typography variant="body2" color="text.secondary">
                - 5 new submissions for Project Proposal.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - 12 pending grades for Homework 3.
              </Typography>
            </>
          }
          actionText="View Submissions"
          onActionClick={() => console.log('View Submissions clicked')} // Placeholder action
        />
      </Grid>

      {/* Upload Materials Card for Faculty */}
      <Grid item xs={12}>
        <DashboardCard
          icon={CloudUpload}
          iconColor="success"
          title="Upload Course Materials"
          content={
            <Typography variant="body2" color="text.secondary">
              Easily upload lecture notes, assignments, and resources for your students.
            </Typography>
          }
          actionText="Upload Files"
          onActionClick={() => console.log('Upload Files clicked')} // Placeholder action
        />
      </Grid>
    </Grid>
  );

  // Admin Dashboard Layout
  const renderAdminDashboard = () => (
    <Grid container spacing={4}>
      {/* Welcome Message for Admin */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ color: '#b71c1c', fontWeight: 'bold' }}>
          Welcome, {userName}! Your Admin Dashboard. ⚙️
        </Typography>
      </Grid>

      {/* User Management Card for Admin */}
      <Grid item xs={12} md={6}>
        <DashboardCard
          icon={Group}
          iconColor="primary"
          title="User Management"
          content={
            <Typography variant="body2" color="text.secondary">
              Manage all user accounts, roles, and permissions across the portal.
            </Typography>
          }
          actionText="Manage Users"
          onActionClick={() => console.log('Manage Users clicked')} // Placeholder action
        />
      </Grid>

      {/* System Overview Card for Admin */}
      <Grid item xs={12} md={6}>
        <DashboardCard
          icon={Notifications}
          iconColor="secondary"
          title="System Overview"
          content={
            <Typography variant="body2" color="text.secondary">
              Monitor system health, activity logs, and overall portal statistics.
            </Typography>
          }
          actionText="View Analytics"
          onActionClick={() => console.log('View Analytics clicked')} // Placeholder action
        />
      </Grid>

      {/* File Moderation Card for Admin */}
      <Grid item xs={12}>
        <DashboardCard
          icon={FolderOpen}
          iconColor="error"
          title="File Moderation"
          content={
            <Typography variant="body2" color="text.secondary">
              Review and moderate all uploaded files to ensure content compliance.
            </Typography>
          }
          actionText="Moderate Files"
          onActionClick={() => console.log('Moderate Files clicked')} // Placeholder action
        />
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {userRole === 'admin' && renderAdminDashboard()}
        {userRole === 'faculty' && renderFacultyDashboard()}
        {userRole === 'student' && renderStudentDashboard()}
        {!userRole && (
          <Box sx={{ textAlign: 'center', p: 4, borderRadius: 2, bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1e88e5', fontWeight: 'medium' }}>
              Please log in to access your personalized dashboard. 🔑
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You can sign up as a new student, or use 'admin@example.com' / 'faculty@example.com'
              with a valid password (e.g., `MyP@ssw0rd1!`) to test different roles.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
