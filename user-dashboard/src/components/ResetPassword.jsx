import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8083/api/forgot/reset",
        null,
        { params: { token, newPassword } }
      );
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">Reset</button>
        </form>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
