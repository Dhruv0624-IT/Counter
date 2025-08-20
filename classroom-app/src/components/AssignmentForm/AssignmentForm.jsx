import React, { useState } from "react";
import styles from "./AssignmentForm.module.css";
import { validateForm } from "../../utils/validateForm";

export default function AssignmentForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(initialData.dueDate || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { title, description, dueDate };
    const validationErrors = validateForm(formData, {
      title: { required: true, minLength: 3 },
      description: { required: true, minLength: 10 },
      dueDate: { required: true },
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit?.(formData);

    // Clear form after submission
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>
        {initialData.title ? "Edit Assignment" : "Create Assignment"}
      </h2>

      {/* Title */}
      <div className={styles.formGroup}>
        <label htmlFor="title">Assignment Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter assignment title"
          className={errors.title ? styles.errorInput : ""}
        />
        {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
      </div>

      {/* Description */}
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter assignment details"
          className={errors.description ? styles.errorInput : ""}
        ></textarea>
        {errors.description && (
          <p className={styles.errorMsg}>{errors.description}</p>
        )}
      </div>

      {/* Due Date */}
      <div className={styles.formGroup}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={errors.dueDate ? styles.errorInput : ""}
        />
        {errors.dueDate && (
          <p className={styles.errorMsg}>{errors.dueDate}</p>
        )}
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitBtn}>
          Save Assignment
        </button>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
