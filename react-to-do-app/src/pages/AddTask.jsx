import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sharedWith, setSharedWith] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const sharedEmails = sharedWith
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    addTask({ title, description, sharedWith: sharedEmails });
    toast.success("Task added successfully!");
    navigate("/view");
  };

  return (
    <div className="container col-md-6 mt-4">
      <h3 className="mb-3 text-center">Add New Task</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="form-label">Share With (Emails comma separated)</label>
          <input
            type="text"
            className="form-control"
            value={sharedWith}
            onChange={(e) => setSharedWith(e.target.value)}
            placeholder="e.g. user2@example.com, user3@example.com"
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
