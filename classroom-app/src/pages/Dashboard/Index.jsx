import React, { useState } from "react";
import ClassCard from "../../components/ClassCard/ClassCard";
import styles from "./DashboardIndex.module.css";

export default function DashboardIndex() {
  const [classrooms, setClassrooms] = useState([
    {
      id: "1",
      title: "Math Fundamentals",
      subject: "Mathematics",
      teacher: "John Doe",
      description:
        "Learn the basics of algebra, geometry, and number theory with engaging lessons and practical examples.",
      isJoined: false,
    },
    {
      id: "2",
      title: "World History",
      subject: "History",
      teacher: "Jane Smith",
      description:
        "Explore the events that shaped our world from ancient civilizations to modern times.",
      isJoined: true,
    },
    {
      id: "3",
      title: "Physics for Beginners",
      subject: "Physics",
      teacher: "Albert Newton",
      description:
        "Understand the laws of motion, energy, and forces with real-world experiments and projects.",
      isJoined: false,
    },
  ]);

  const handleJoin = (id) => {
    setClassrooms((prev) =>
      prev.map((cls) =>
        cls.id === id ? { ...cls, isJoined: true } : cls
      )
    );
    alert("You have joined the class!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Classes</h1>
      <div className={styles.grid}>
        {classrooms.map((classroom) => (
          <ClassCard
            key={classroom.id}
            {...classroom}
            onJoin={handleJoin}
          />
        ))}
      </div>
    </div>
  );
}
