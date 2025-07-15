import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardPanels from './pages/DashboardPanels';
import UserManagement from './pages/UserManagement';

const App = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // ✅ Add or remove class from <body>
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // ✅ Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="d-flex" id="wrapper">
      {isSidebarVisible && <Sidebar />}
      <div id="page-content-wrapper" className="flex-grow-1 d-flex flex-column">
        <Navbar
          onToggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setDarkMode(prev => !prev)}
        />
        <div className="container-fluid flex-grow-1 my-4">
          <Routes>
            <Route path="/" element={<DashboardPanels />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
