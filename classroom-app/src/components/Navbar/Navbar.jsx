import React, { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ onToggleSidebar }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  return (
    <header className={styles.navbar}>
      {/* Left side */}
      <div className={styles.left}>
        <button className={styles.iconBtn} onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <h1 className={styles.title}>Classroom</h1>
      </div>

      {/* Right side */}
      <div className={styles.right}>
        <div className={styles.menuWrapper}>
          <button
            className={styles.iconBtn}
            onClick={() => setShowPlusMenu(!showPlusMenu)}
          >
            <FaPlus />
          </button>
          {showPlusMenu && (
            <div className={styles.dropdown}>
              <button onClick={() => alert("Join class clicked")}>
                Join class
              </button>
              <button onClick={() => alert("Create class clicked")}>
                Create class
              </button>
            </div>
          )}
        </div>

        {user && (
          <button
            className={styles.profileBtn}
            onClick={() => navigate("/profile")}
          >
            <img
              src={user.photoURL || "https://ui-avatars.com/api/?name=U"}
              alt="Profile"
              className={styles.avatar}
            />
          </button>
        )}
      </div>
    </header>
  );
}
