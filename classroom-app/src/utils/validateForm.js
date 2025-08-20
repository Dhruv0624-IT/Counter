// utils/validateForm.js
export default function validateForm(values, type) {
  const errors = {};

  if (type === "login") {
    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";

    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  }

  if (type === "register") {
    if (!values.name) errors.name = "Name is required";

    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";

    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  }

  if (type === "forgotPassword") {
    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
  }

  return errors;
}
