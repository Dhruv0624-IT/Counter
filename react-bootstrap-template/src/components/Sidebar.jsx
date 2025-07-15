import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
<div className="bg-dark text-white sidebar p-3" id="sidebar">
    <h3 className="sidebar-brand">Admin Panel</h3>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/" className="nav-link text-white">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link text-white">User Management</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
