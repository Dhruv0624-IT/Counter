import React from 'react'; // React is needed for React.lazy

// Lazy-loaded page components
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/AdminDashboardPage'));

// Placeholder components for routes hinted in Sidebar (if they become dedicated pages)
// You would also lazy-load these if they become large or complex
const StudentCoursesPage = React.lazy(() => import('./pages/StudentCoursesPage'));
const StudentAssignmentsPage = React.lazy(() => import('./pages/StudentAssignmentsPage'));
const StudentCalendarPage = React.lazy(() => import('./pages/StudentCalendarPage'));
const FacultyTaughtCoursesPage = React.lazy(() => import('./pages/FacultyTaughtCoursesPage'));
const FacultySubmissionsPage = React.lazy(() => import('./pages/FacultySubmissionsPage'));
const FacultyUploadMaterialsPage = React.lazy(() => import('./pages/FacultyUploadMaterialsPage'));
const AdminUserManagementPage = React.lazy(() => import('./pages/AdminUserManagementPage'));
const AdminSystemAnalyticsPage = React.lazy(() => import('./pages/AdminSystemAnalyticsPage'));
const AdminFileModerationPage = React.lazy(() => import('./pages/AdminFileModerationPage'));
const AdminSettingsPage = React.lazy(() => import('./pages/AdminSettingsPage'));


const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true
  },
  {
    path: '/signup',
    component: SignUpPage,
    exact: true
  },
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
    exact: true
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboardPage,
    exact: true
  },
  {
    path: '/student-courses',
    component: StudentCoursesPage,
    exact: true
  },
  {
    path: '/student-assignments',
    component: StudentAssignmentsPage,
    exact: true
  },
  {
    path: '/student-calendar',
    component: StudentCalendarPage,
    exact: true
  },
  {
    path: '/faculty-courses',
    component: FacultyTaughtCoursesPage,
    exact: true
  },
  {
    path: '/faculty-submissions',
    component: FacultySubmissionsPage,
    exact: true
  },
  {
    path: '/faculty-upload',
    component: FacultyUploadMaterialsPage,
    exact: true
  },
  {
    path: '/admin-users',
    component: AdminUserManagementPage,
    exact: true
  },
  {
    path: '/admin-analytics',
    component: AdminSystemAnalyticsPage,
    exact: true
  },
  {
    path: '/admin-moderation',
    component: AdminFileModerationPage,
    exact: true
  },
  {
    path: '/admin-settings',
    component: AdminSettingsPage,
    exact: true
  },
];

export default routes;
