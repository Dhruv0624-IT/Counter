import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import {
  Group as UserGroupIcon,
  CloudUpload as CloudUploadIcon,
  BarChart as AnalyticsIcon,
  CheckCircleOutline as CheckCircleIcon,
  HelpOutline as HelpIcon,
  Block as BlockIcon // For moderation related items
} from '@mui/icons-material';

// Assuming DashboardCard is available in '../components/DashboardCard'
import DashboardCard from '../components/DashboardCard';

function AdminDashboardPage() {
  // Dummy state for demonstration purposes
  const [totalUsers, setTotalUsers] = useState(1250);
  const [pendingFiles, setPendingFiles] = useState(7);
  const [activeSessions, setActiveSessions] = useState(85);

  // Dummy action handlers for demonstration
  const handleManageUsersClick = () => {
    console.log('Navigating to User Management...');
    // In a real app, you'd use navigate('/admin/users') here
  };

  const handleReviewFilesClick = () => {
    console.log('Navigating to File Moderation...');
    // In a real app, you'd use navigate('/admin/moderation') here
  };

  const handleViewAnalyticsClick = () => {
    console.log('Navigating to System Analytics...');
    // In a real app, you'd use navigate('/admin/analytics') here
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Administrator Dashboard 🚀
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          This central hub provides comprehensive tools and insights for system administration.
        </Typography>

        <Grid container spacing={4}>
          {/* User Management Card */}
          <Grid item xs={12} md={6} lg={4}>
            <DashboardCard
              icon={UserGroupIcon}
              iconColor="primary"
              title="User Management"
              content={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Oversee all user accounts, roles, and permissions.
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Total Registered Users: <Box component="span" sx={{ fontWeight: 'bold' }}>{totalUsers}</Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active this week: {Math.floor(totalUsers * 0.15)}
                  </Typography>
                </Box>
              }
              actionText="Manage Users"
              onActionClick={handleManageUsersClick}
            />
          </Grid>

          {/* File Moderation Card */}
          <Grid item xs={12} md={6} lg={4}>
            <DashboardCard
              icon={BlockIcon} // Using BlockIcon for moderation context
              iconColor="warning" // Warning color for pending actions
              title="Content Moderation"
              content={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Review and moderate uploaded files and content for compliance.
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Pending Reviews: <Box component="span" sx={{ fontWeight: 'bold' }}>{pendingFiles}</Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last reviewed: 2 hours ago
                  </Typography>
                </Box>
              }
              actionText="Review Content"
              onActionClick={handleReviewFilesClick}
            />
          </Grid>

          {/* System Analytics Card */}
          <Grid item xs={12} md={6} lg={4}>
            <DashboardCard
              icon={AnalyticsIcon}
              iconColor="info"
              title="System Overview"
              content={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Monitor overall system health, performance, and activity logs.
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Active Sessions: <Box component="span" sx={{ fontWeight: 'bold' }}>{activeSessions}</Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Peak today: 110 sessions
                  </Typography>
                </Box>
              }
              actionText="View Analytics"
              onActionClick={handleViewAnalyticsClick}
            />
          </Grid>

          {/* New Card: System Configuration & Settings */}
          <Grid item xs={12} md={6} lg={4}>
            <DashboardCard
              icon={CheckCircleIcon}
              iconColor="success"
              title="Health & Status"
              content={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Check critical system services and database status.
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    All Services: <Box component="span" sx={{ fontWeight: 'bold', color: 'green' }}>Operational</Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last check: Just now
                  </Typography>
                </Box>
              }
              actionText="Configure System"
              onActionClick={() => console.log('Navigating to System Configuration...')}
            />
          </Grid>

          {/* New Card: Support & Helpdesk */}
          <Grid item xs={12} md={6} lg={4}>
            <DashboardCard
              icon={HelpIcon}
              iconColor="secondary"
              title="Support & Issues"
              content={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Manage reported issues, user queries, and support tickets.
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Open Tickets: <Box component="span" sx={{ fontWeight: 'bold' }}>5</Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    High Priority: 1
                  </Typography>
                </Box>
              }
              actionText="Go to Helpdesk"
              onActionClick={() => console.log('Navigating to Helpdesk...')}
            />
          </Grid>

           {/* New Card: Backup & Restore */}
           <Grid item xs={12} md={6} lg={4}>
            <DashboardCard
              icon={CloudUploadIcon} // Reusing CloudUpload for backup, or find a specific backup icon
              iconColor="error" // Red for critical backup tasks
              title="Backup & Restore"
              content={
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Manage data backups and restoration points for disaster recovery.
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Last Backup: <Box component="span" sx={{ fontWeight: 'bold' }}>24 hours ago</Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next scheduled: Daily at 2 AM
                  </Typography>
                </Box>
              }
              actionText="Manage Backups"
              onActionClick={() => console.log('Navigating to Backup & Restore...')}
            />
          </Grid>

        </Grid>
      </Box>
    </Container>
  );
}

export default AdminDashboardPage;
