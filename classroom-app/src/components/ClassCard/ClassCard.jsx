import React from "react";
import styles from "./ClassCard.module.css";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

export default function ClassCard({
  id,
  title,
  subject,
  teacher,
  description,
  onJoin,
  isJoined = false,
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <FiBookOpen size={28} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subject}>{subject}</p>
          <p className={styles.teacher}>By {teacher}</p>
        </div>
      </div>

      <p className={styles.description}>
        {description?.length > 120
          ? description.substring(0, 120) + "..."
          : description}
      </p>

      <div className={styles.actions}>
        {!isJoined && (
          <button
            className={styles.joinButton}
            onClick={() => onJoin && onJoin(id)}
          >
            Join Class
          </button>
        )}
        <button
          className={styles.viewButton}
          onClick={() => navigate(`/dashboard/classroom/${id}`)}
        >
          View <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
