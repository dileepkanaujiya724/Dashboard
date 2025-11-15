import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("info");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8083/api/forgot/reset",
        null,
        { params: { token, newPassword } }
      );

      setType("success");
      setMsg(res.data.message);

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);

    } catch (err) {
      setType("error");
      setMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>

        <form onSubmit={submit}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {msg && <p className={`auth-message ${type}`}>{msg}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
