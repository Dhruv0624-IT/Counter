import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WeAreUi = ({ title, image , branch }) => {
  return (
    <div className="modern-city-card">
      <div
        className="modern-city-bg"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="modern-city-gradient" />
        <div className="modern-city-overlay-text">
          <div className="modern-city-title">{title}</div>
          <div className="modern-city-branch">{branch}</div>
        </div>
      </div>
    </div>
  );
};

export default WeAreUi;
