import React, { useState } from "react";
import styles from "./Gradebook.module.css";

export default function Gradebook() {
  const [grades, setGrades] = useState([
    {
      student: "Alice Johnson",
      assignments: [
        { title: "Algebra Homework", grade: 95 },
        { title: "Geometry Project", grade: 88 },
      ],
    },
    {
      student: "Bob Smith",
      assignments: [
        { title: "Algebra Homework", grade: 72 },
        { title: "Geometry Project", grade: 64 },
      ],
    },
    {
      student: "Charlie Davis",
      assignments: [
        { title: "Algebra Homework", grade: 50 },
        { title: "Geometry Project", grade: 58 },
      ],
    },
  ]);

  const handleGradeChange = (studentIndex, assignmentIndex, value) => {
    const updated = [...grades];
    updated[studentIndex].assignments[assignmentIndex].grade = Number(value);
    setGrades(updated);
  };

  const getGradeClass = (grade) => {
    if (grade >= 85) return styles.gradeGood;
    if (grade >= 60) return styles.gradeWarning;
    return styles.gradeFail;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Gradebook</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              {grades[0].assignments.map((a, i) => (
                <th key={i}>{a.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.map((student, studentIndex) => (
              <tr key={student.student}>
                <td className={styles.studentName} data-label="Student">
                  {student.student}
                </td>
                {student.assignments.map((a, assignmentIndex) => (
                  <td key={a.title} data-label={a.title}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={a.grade}
                      onChange={(e) =>
                        handleGradeChange(
                          studentIndex,
                          assignmentIndex,
                          e.target.value
                        )
                      }
                      className={`${styles.gradeInput} ${getGradeClass(
                        a.grade
                      )}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
