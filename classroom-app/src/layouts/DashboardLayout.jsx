import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/global.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet /> {/* Dashboard pages like Index, Classroom, Assignment, Gradebook render here */}
        </main>
      </div>
    </div>
  );
}
