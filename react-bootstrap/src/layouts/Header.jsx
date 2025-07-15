import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Header.css";

const Header = () => {
  return (
    <>
      <header className="d-block bg-white fixed-top main-header">
        <nav className="navbar navbar-expand-lg border-bottom border-dark p-3">
          <div className="navbar-brand ps-2">
            <img src="public/rnw-logo.png" className="logo" alt="Logo" />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto pe-4">
              <div className="nav-item">
                <a className="nav-link fw-medium" href="/">Home</a>
              </div>
              <div className="nav-item">
                <a className="nav-link fw-medium" href="/">STD 10th & 12th</a>
              </div>
              <div className="nav-item">
                <a className="nav-link fw-medium" href="/">Career Courses</a>
              </div>
              <div className="nav-item">
                <a className="nav-link fw-medium" href="/">Courses</a>
              </div>
              <div className="nav-item">
                <a className="nav-link fw-medium" href="/">About Us</a>
              </div>
              <div className="nav-item">
                <a className="nav-link fw-medium" href="/">Student Corner</a>
              </div>
              <div className="nav-item pe-3">
                <a className="nav-link fw-medium" href="/">Contact Us</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;