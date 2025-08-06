import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete, editTask } = useTasks();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      toast.success("Task deleted");
    }
  };

  const handleEditSave = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      toast.error("Title and description are required.");
      return;
    }

    editTask(task.id, { title: newTitle, description: newDescription });
    toast.success("Task updated");
    setIsEditing(false);
  };

  return (
    <div className={`card shadow ${task.completed ? "border-success" : ""}`}>
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              className="form-control mb-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-3"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
            <button onClick={handleEditSave} className="btn btn-success btn-sm me-2">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary btn-sm">
              Cancel
            </button>
          </>
        ) : (
          <>
            <h5 className={`card-title ${task.completed ? "text-success" : ""}`}>
              {task.title}
            </h5>
            <p className="card-text">{task.description}</p>
            <p className="text-muted small">
              Owner: {task.owner} {task.sharedWith?.includes(user.email) && "(shared)"}
            </p>
            <div className="d-flex flex-wrap gap-2">
              {task.owner === user.email && (
                <>
                  <button onClick={() => setIsEditing(true)} className="btn btn-outline-primary btn-sm">
                    ✏️ Edit
                  </button>
                  <button onClick={handleDelete} className="btn btn-outline-danger btn-sm">
                    🗑️ Delete
                  </button>
                </>
              )}
              <button
                onClick={() => toggleComplete(task.id)}
                className={`btn btn-sm ${
                  task.completed ? "btn-outline-warning" : "btn-outline-success"
                }`}
              >
                {task.completed ? "Mark as Pending" : "Mark as Done"}
              </button>
              <Link to={`/shared/${task.id}`} className="btn btn-outline-info btn-sm">
                🔗 View Shared
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
