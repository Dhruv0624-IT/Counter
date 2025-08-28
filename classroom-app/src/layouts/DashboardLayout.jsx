// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.layout}>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className={styles.main}>
        <Sidebar isOpen={isSidebarOpen} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
