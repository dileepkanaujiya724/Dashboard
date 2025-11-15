import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8083/api/forgot/request", { email });
      // 🖥️ MODIFIED: Expecting JSON response with .data.message
      setMessage(res.data.message || "Reset link sent successfully!"); 
      // console.log("Reset token (for testing):", res.data.token); // Optional for testing
    } catch (err) {
      console.error(err);
      // 🖥️ MODIFIED: Extracting error message from the structured response
      const errorMsg =
        err.response?.data?.message || "Failed to send reset link. Please try again."; 
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">Dashboard</h1>
        <h2 className="auth-title">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;