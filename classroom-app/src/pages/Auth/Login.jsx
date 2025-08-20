import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import validateForm from "../../utils/validateForm";
import styles from "./AuthForm.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setFirebaseError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, "login");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/profile");
    } catch (err) {
      setFirebaseError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>

      {firebaseError && <p className={styles.error}>{firebaseError}</p>}

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

      <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <span className={styles.togglePassword} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className={styles.links}>
        <Link to="/register">Create an account</Link>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
}
