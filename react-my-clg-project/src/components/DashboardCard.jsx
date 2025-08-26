// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material'; // Removed Card, CardContent, CardActions, Button as they are now in DashboardCard
import { AccessTime, Assignment, FolderOpen, Notifications, Group, CloudUpload } from '@mui/icons-material';

// Import the new DashboardCard component
import DashboardCard from '../components/DashboardCard';

function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        if (parsedUser && parsedUser.role) {
          setUserRole(parsedUser.role);
          setUserName(`${parsedUser.firstName} ${parsedUser.lastName}`);
        } else {
          setUserRole(null);
          setUserName('Guest');
        }
      } catch (e) {
        console.error("Failed to parse loggedInUser from localStorage:", e);
        setUserRole(null);
        setUserName('Guest');
        localStorage.removeItem('loggedInUser');
      }
    } else {
      setUserRole(null);
      setUserName('Guest');
    }
  }, []);

  const renderStudentDashboard = () => (
    <Grid container spacing={4}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Welcome, {userName}! Your Student Dashboard.
        </Typography>
      </Grid>

      {/* Recent Activity Card */}
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
          onActionClick={() => console.log('View All Activities clicked')}
        />
      </Grid>

      {/* Upcoming Deadlines Card */}
      <Grid item xs={12} md={6} lg={4}>
        <DashboardCard
          icon={AccessTime}
          iconColor="secondary"
          title="Upcoming Deadlines"
          content={
            <>
              <Typography variant="body2" color="text.secondary">
                - **Aug 15:** Project Proposal (Software Engineering)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - **Aug 20:** Homework 3 (Calculus I)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - **Sep 1:** Research Paper Draft (History)
              </Typography>
            </>
          }
          actionText="View Calendar"
          onActionClick={() => console.log('View Calendar clicked')}
        />
      </Grid>

      {/* My Courses Card */}
      <Grid item xs={12} md={6} lg={4}>
        <DashboardCard
          icon={Assignment}
          iconColor="info"
          title="My Courses"
          content={
            <>
              <Typography variant="body2" color="text.secondary">
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
          onActionClick={() => console.log('Go to Courses clicked')}
        />
      </Grid>
    </Grid>
  );

  const renderFacultyDashboard = () => (
    <Grid container spacing={4}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Welcome, {userName}! Your Faculty Dashboard.
        </Typography>
      </Grid>

      {/* Courses Taught Card */}
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
          onActionClick={() => console.log('Manage Courses clicked')}
        />
      </Grid>

      {/* Student Submissions Card */}
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
          onActionClick={() => console.log('View Submissions clicked')}
        />
      </Grid>

      {/* Upload Materials Card */}
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
          onActionClick={() => console.log('Upload Files clicked')}
        />
      </Grid>
    </Grid>
  );

  const renderAdminDashboard = () => (
    <Grid container spacing={4}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Welcome, {userName}! Your Admin Dashboard.
        </Typography>
      </Grid>

      {/* User Management Card */}
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
          onActionClick={() => console.log('Manage Users clicked')}
        />
      </Grid>

      {/* System Overview Card */}
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
          onActionClick={() => console.log('View Analytics clicked')}
        />
      </Grid>

      {/* File Moderation Card */}
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
          onActionClick={() => console.log('Moderate Files clicked')}
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
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Please log in to access your personalized dashboard.
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
