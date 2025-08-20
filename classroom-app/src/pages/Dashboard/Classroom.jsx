import React, { useState } from "react";
import styles from "./Classroom.module.css";
import FileUploader from "../../components/FileUploader/FileUploader";
import formatDate from "../../utils/formatDate";

export default function Classroom() {
  const [assignments, setAssignments] = useState([
    {
      id: "a1",
      title: "Algebra Homework",
      description: "Complete exercises from page 45 to 48 in your math book.",
      dueDate: "2025-08-15",
    },
    {
      id: "a2",
      title: "Geometry Project",
      description: "Create a model demonstrating the Pythagorean theorem.",
      dueDate: "2025-08-20",
    },
  ]);

  const handleFileUpload = (assignmentId, file) => {
    console.log(`File uploaded for assignment ${assignmentId}:`, file.name);
    alert(`Your file "${file.name}" has been uploaded successfully!`);
  };

  return (
    <div className={styles.container}>
      {/* Class Info */}
      <div className={styles.header}>
        <h1 className={styles.title}>Math Fundamentals</h1>
        <p className={styles.meta}>Subject: Mathematics</p>
        <p className={styles.meta}>Teacher: John Doe</p>
      </div>

      {/* Assignments Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Assignments</h2>
        <div className={styles.assignments}>
          {assignments.map((assignment) => (
            <div key={assignment.id} className={styles.assignmentCard}>
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p className={styles.dueDate}>
                Due: {formatDate(assignment.dueDate)}
              </p>
              <FileUploader
                onFileSelect={(file) =>
                  handleFileUpload(assignment.id, file)
                }
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
