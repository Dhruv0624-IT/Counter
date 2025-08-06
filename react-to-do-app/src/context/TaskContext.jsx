import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const userEmail = user?.email;

    if (userEmail) {
      const filtered = allTasks.filter(
        (task) => task.owner === userEmail || task.sharedWith?.includes(userEmail)
      );
      setTasks(filtered);
    } else {
      setTasks([]);
    }
  }, [user]);

  const saveToStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    const userEmail = user?.email;
    setTasks(updatedTasks.filter(
      (task) => task.owner === userEmail || task.sharedWith?.includes(userEmail)
    ));
  };

  const addTask = (task) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      ...task,
      id: uuidv4(),
      owner: user.email,
      sharedWith: task.sharedWith || [],
      completed: false,
    };
    const updated = [...allTasks, newTask];
    saveToStorage(updated);
  };

  const editTask = (id, updatedTask) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = allTasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    saveToStorage(updated);
  };

  const deleteTask = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = allTasks.filter((task) => task.id !== id);
    saveToStorage(updated);
  };

  const toggleComplete = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = allTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveToStorage(updated);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
