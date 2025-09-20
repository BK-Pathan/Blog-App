import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import "./Login.css"; // 👈 CSS import

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      await authService.login(data);
      const userData = await authService.getUser();

      if (userData) {
        dispatch(authLogin(userData));
        navigate("/all-posts");
      } else {
        setError("Failed to fetch user after login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <span>
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="login-title">Sign in to your account</h2>
        <p className="login-subtitle">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="login-form">
          <div className="form-group">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email must be valid",
                },
              })}
            />
          </div>

          <div className="form-group">
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>

          <Button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
