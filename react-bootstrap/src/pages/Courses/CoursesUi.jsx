import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CoursesUi = ({ image, title }) => {
  return (
    <div className="simple-course-card">
      <div className="simple-course-icon-wrapper">
        <img className="simple-course-icon" src={image} alt={title} />
      </div>
      <div className="simple-course-title">{title}</div>
    </div>
  );
};
export default CoursesUi;

