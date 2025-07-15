import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/NavBar';
import Blog from './Pages/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ViewBlog from './Pages/ViewBlog';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/addBlog" element={<Blog />} />
        <Route path="/ViewBlog" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
