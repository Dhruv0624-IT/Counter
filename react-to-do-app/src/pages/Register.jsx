import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const success = register(form.name, form.email, form.password, form.role);
    if (success) {
      toast.success("Registered successfully!");
      navigate("/");
    } else {
      toast.error("User already exists!");
    }
  };

  return (
    <div className="container col-md-5 mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label>Name</label>
          <input name="name" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label>Role</label>
          <select name="role" className="form-control" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
