import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles/global.css";
import styles from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <div className={styles.authLayout}>
      {/* Header */}
      <header className={styles.authHeader}>
        <Link to="/" className={styles.logo}>
          Classroom App
        </Link>
      </header>

      {/* Main Content */}
      <main className={styles.authMain}>
        <div className={styles.authCard}>
          <Outlet /> {/* Login, Register, Forgot Password pages */}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.authFooter}>
        <p>© {new Date().getFullYear()} Classroom App. All rights reserved.</p>
      </footer>
    </div>
  );
}
