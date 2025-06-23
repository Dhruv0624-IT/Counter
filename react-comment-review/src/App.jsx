import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
    reset();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center text-success mb-4"> Registration Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  placeholder="Enter username"
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && <div className="text-danger">{errors.username.message}</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <div className="text-danger">{errors.email.message}</div>}
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter 10-digit phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  })}
                />
                {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && <div className="text-danger">{errors.password.message}</div>}
              </div>

              {/* Country */}
              <div className="mb-3">
                <label className="form-label">Country</label>
                <select className="form-select" {...register("country", { required: "Country is required" })}>
                  <option value="">-- Select Country --</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                </select>
                {errors.country && <div className="text-danger">{errors.country.message}</div>}
              </div>

              {/* Bio */}
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  placeholder="Tell us about yourself"
                  rows="3"
                  {...register("bio", { required: "Bio is required" })}
                />
                {errors.bio && <div className="text-danger">{errors.bio.message}</div>}
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select className="form-select" {...register("gender", { required: "Gender is required" })}>
                  <option value="">-- Select Gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <div className="text-danger">{errors.gender.message}</div>}
              </div>

              {/* Terms and Conditions */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...register("agree", { required: "You must agree to the terms" })}
                />
                <label className="form-check-label">
                  I agree to the terms and conditions
                </label>
                {errors.agree && <div className="text-danger">{errors.agree.message}</div>}
              </div>

              <button type="submit" className="btn btn-success w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
