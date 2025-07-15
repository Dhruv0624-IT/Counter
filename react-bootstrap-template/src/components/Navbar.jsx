import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar, isDarkMode, onToggleDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        {/* Sidebar Toggle */}
        <button className="btn btn-primary me-2" onClick={onToggleSidebar}>☰</button>

        {/* Right Side Dropdown */}
        <div className="ms-auto d-flex align-items-center gap-3">
       <button className="btn btn-outline-dark" onClick={onToggleDarkMode} title="Toggle Dark Mode">
            {isDarkMode ? '🌙 Dark' : '☀️ Light'} </button>

          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
               data-bs-toggle="dropdown"> {user?.email || "Admin"} </button>
               
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item" onClick={() => alert("Profile clicked!")}>Profile</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
