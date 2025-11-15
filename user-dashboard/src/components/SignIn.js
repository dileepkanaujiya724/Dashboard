import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8082/api/auth/signin", {
        email,
        password,
      });

     /* if (response.status === 200) {

        navigate("/dashboard");
      }*/
     if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
    navigate("/dashboard");
  }
    } catch (error) {

      setMessage("Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">Dashboard</h1>
        {/*<h2 className="auth-title">Sign In</h2>*/}

        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="auth-footer">
          Don’t have an account? <Link to="/create">Create User</Link>
          <br />
          <Link to="/forgot">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
