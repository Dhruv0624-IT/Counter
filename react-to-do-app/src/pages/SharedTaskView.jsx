import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SharedTaskView = () => {
  const { taskId } = useParams();
  const { user } = useAuth();
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const task = allTasks.find((t) => t.id === taskId);

  if (!task || (!task.sharedWith?.includes(user.email) && task.owner !== user.email)) {
    return <div className="container mt-5"><h5>Unauthorized to view this task.</h5></div>;
  }

  return (
    <div className="container col-md-6 mt-5">
      <h3 className="text-center mb-4">Shared Task</h3>
      <div className="card p-4 shadow">
        <h5 className="text-success">Title:</h5>
        <p>{task.title}</p>
        <h6 className="text-success">Description:</h6>
        <p>{task.description}</p>
        <h6 className="text-muted">Shared by:</h6>
        <p>{task.owner}</p>
      </div>
    </div>
  );
};

export default SharedTaskView;
