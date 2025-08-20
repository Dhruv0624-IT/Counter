import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useClassroom } from "../../contexts/ClassroomContext";
import styles from "./Sidebar.module.css";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const { classrooms } = useClassroom();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <h2 className={styles.logo}>Classroom</h2>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Dashboard
          </NavLink>

          <div className={styles.sectionTitle}>My Classes</div>
          {classrooms.length > 0 ? (
            classrooms.map((cls) => (
              <NavLink
                key={cls.id}
                to={`/classroom/${cls.id}`}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {cls.name}
              </NavLink>
            ))
          ) : (
            <p className={styles.emptyText}>No classes yet</p>
          )}

          <div className={styles.sectionTitle}>Other</div>
          <NavLink
            to="/assignments"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Assignments
          </NavLink>
          <NavLink
            to="/gradebook"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Gradebook
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
