// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { ClassroomProvider } from "./contexts/ClassroomContext";

export default function App() {
  return (
    <AuthProvider>
      <ClassroomProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ClassroomProvider>
    </AuthProvider>
  );
}
