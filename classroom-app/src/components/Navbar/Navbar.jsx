import React from "react";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <h1 className={styles.appTitle}>Classroom App</h1>
      </div>

      <div className={styles.right}>
        {user && (
          <div className={styles.userSection}>
            <span className={styles.userName}>
              {user.displayName || user.email}
            </span>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              aria-label="Logout"
            >
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
