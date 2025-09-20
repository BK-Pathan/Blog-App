import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./Logo"; // ✅ Agar aapke pass Logo component hai
import "./Sign.css"; // ✅ Import CSS

function SignupForm() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authService.createAccount(form);
      await authService.login({ email: form.email, password: form.password });
      const user = await authService.getUser();
      if (user) {
        dispatch(login(user));
      }
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      {/* Logo */}
      <div className="signup-logo">
        <Logo width="100%" />
      </div>

      {/* Heading */}
      <h2 className="signup-heading">Create your account</h2>
      <p className="signup-subtext">
        Already have an account?{" "}
        <Link to="/login" className="signup-link">
          Sign in
        </Link>
      </p>

      {/* Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="signup-input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
