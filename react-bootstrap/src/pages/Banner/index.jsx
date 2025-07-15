import React from "react";

const stats = [
  { icon: "fas fa-user-graduate", value: 40000, label: "Students Trained" },
  { icon: "fas fa-book-open", value: 50, label: "Approved Courses" },
  { icon: "fas fa-building", value: 1500, label: "Companies Tie-Ups" },
  { icon: "fas fa-map-marker-alt", value: 22, label: "Branches" },
  { icon: "fas fa-certificate", value: 8, label: "Certification" },
];

const CounterBanner = () => {
  return (
    <section className="modern-stats-section">
      <div className="container">
        <div className="row justify-content-center align-items-center g-4">
          {stats.map((stat, idx) => (
            <div className="col-6 col-md-2 text-center" key={idx}>
              <div className="modern-stat-card">
                <i className={`${stat.icon} modern-stat-icon`}></i>
                <div className="modern-stat-value">{stat.value}+</div>
                <div className="modern-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterBanner;