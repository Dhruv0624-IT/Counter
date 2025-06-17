import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputs, setInputs] = useState({
    userEmail: '',
    userPassword: '',
  });

  const [errors, setErrors] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { userEmail: '', userPassword: '' };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!inputs.userEmail.trim()) {
      newErrors.userEmail = 'Please enter your email!';
      isValid = false;
    } else if (!emailPattern.test(inputs.userEmail)) {
      newErrors.userEmail = 'Invalid email address!';
      isValid = false;
    }

    if (!inputs.userPassword.trim()) {
      newErrors.userPassword = 'Please enter your password!';
      isValid = false;
    } else if (!passwordPattern.test(inputs.userPassword)) {
      newErrors.userPassword = 'Password must be at least 6 characters and include a number.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('User Email:', inputs.userEmail);
      console.log('User Password:', inputs.userPassword);
      setInputs({ userEmail: '', userPassword: '' });
      setErrors({ userEmail: '', userPassword: '' });
    }
  };

  return (
    <div className="wrapper">
      <section className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleFormSubmit} noValidate>
          <div className="input-block">
            <label>Email Address</label>
            <input
              type="text"
              name="userEmail"
              value={inputs.userEmail}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.userEmail && <small className="error">{errors.userEmail}</small>}
          </div>

          <div className="input-block">
            <label>Password</label>
            <input
              type="password"
              name="userPassword"
              value={inputs.userPassword}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.userPassword && <small className="error">{errors.userPassword}</small>}
          </div>

          <div className="button-wrap">
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default App;
