import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import validateForm from "../../utils/validateForm";
import styles from "./AuthForm.module.css";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setFirebaseError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, "forgotPassword");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await resetPassword(formData.email);
      setSuccessMessage("✅ Password reset email sent! Check your inbox.");
    } catch (err) {
      setFirebaseError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Forgot Password</h2>

      {firebaseError && <p className={styles.error}>{firebaseError}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className={styles.links}>
        <Link to="/login">Back to Login</Link>
      </div>
    </form>
  );
}
