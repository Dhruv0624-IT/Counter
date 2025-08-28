// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "../utils/ProtectedRoute";
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

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------- Public Auth Routes ---------- */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
      </Route>

      {/* ---------- Protected Dashboard Routes ---------- */}
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

      {/* ---------- Default redirect ---------- */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
