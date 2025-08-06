import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import ViewTasks from "./pages/ViewTasks";
import SharedTaskView from "./pages/SharedTaskView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext"; 


const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/add" element={user ? <AddTask /> : <Navigate to="/" />} />
          <Route path="/view" element={user ? <ViewTasks /> : <Navigate to="/" />} />
          <Route path="/shared/:taskId" element={<SharedTaskView />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default App;
