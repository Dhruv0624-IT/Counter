import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

const ViewTasks = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Tasks</h3>

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-outline-primary me-2 ${filter === "All" && "active"}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`btn btn-outline-success me-2 ${filter === "Completed" && "active"}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          className={`btn btn-outline-warning ${filter === "Pending" && "active"}`}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-muted">No tasks to display.</p>
      ) : (
        <div className="row">
          {filteredTasks.map((task) => (
            <div key={task.id} className="col-md-6 mb-3">
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
