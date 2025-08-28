import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { ClassroomProvider } from "./contexts/ClassroomContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ClassroomProvider>
          <div className="appContainer">
            {/* Navbar at top */}
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Body with sidebar + content */}
            <div className="appBody">
              <Sidebar isOpen={isSidebarOpen} />
              <main className="appContent">
                <AppRoutes />
              </main>
            </div>
          </div>
        </ClassroomProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
