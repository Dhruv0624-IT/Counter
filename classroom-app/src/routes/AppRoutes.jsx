// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Dashboard from "../pages/Dashboard/Index";
import Classroom from "../pages/Dashboard/Classroom";
import Assignment from "../pages/Dashboard/Assignment";
import Gradebook from "../pages/Dashboard/Gradebook";
import Profile from "../pages/Profile";

import ProtectedRoute from "../utils/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classroom/:id" element={<Classroom />} />
        <Route path="/assignment/:id" element={<Assignment />} />
        <Route path="/gradebook/:id" element={<Gradebook />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
