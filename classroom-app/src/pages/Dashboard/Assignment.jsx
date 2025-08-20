import React from "react";
import formatDate from "../../utils/formatDate";
import { FaFileAlt, FaUpload, FaClock } from "react-icons/fa";
import styles from "./Assignment.module.css";

export default function Assignment() {
  const sampleAssignment = {
    title: "React Project",
    description:
      "Build a classroom management system that mimics Google Classroom. Focus on clean UI, reusable components, and Firebase integration.",
    dueDate: "2025-08-20",
    attachments: ["project-specs.pdf", "sample-design.png"],
  };

  // Calculate urgency for styling
  const today = new Date();
  const due = new Date(sampleAssignment.dueDate);
  const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  const getDueClass = () => {
    if (daysLeft <= 0) return styles.overdue;
    if (daysLeft <= 3) return styles.dueSoon;
    return styles.dueNormal;
  };

  return (
    <div className={styles.assignmentContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>{sampleAssignment.title}</h1>
        <p className={styles.description}>{sampleAssignment.description}</p>
      </header>

      <section className={styles.dueDateSection}>
        <FaClock className={styles.clockIcon} />
        <span className={`${styles.dueDate} ${getDueClass()}`}>
          Due {formatDate(sampleAssignment.dueDate)}{" "}
          {daysLeft > 0 && `(${daysLeft} days left)`}
        </span>
      </section>

      {sampleAssignment.attachments.length > 0 && (
        <section className={styles.attachments}>
          <h3>Attachments:</h3>
          <ul>
            {sampleAssignment.attachments.map((file, idx) => (
              <li key={idx}>
                <FaFileAlt className={styles.fileIcon} />
                <a href={`#${file}`} download>
                  {file}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.actions}>
        <button className={styles.uploadBtn}>
          <FaUpload /> Submit Assignment
        </button>
      </div>
    </div>
  );
}
