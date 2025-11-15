import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function UpdateProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("user");
      console.log("Stored user data:", storedData);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        // Handle both structures
        const actualUser = parsed.user ? parsed.user : parsed;
        setUser(actualUser);
        setName(actualUser.name || "");
        setEmail(actualUser.email || "");
      } else {
        navigate("/signin");
      }
    } catch (err) {
      console.error("Error reading user data:", err);
      navigate("/signin");
    }
  }, [navigate]);

  const handleUpdate = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await axios.put(
      `http://localhost:8084/api/profile/update/${user.id}`,
      { name, email }
    );

    console.log("Update response:", res.data);

    // Save updated user to localStorage (keep same key structure)
    localStorage.setItem("user", JSON.stringify(res.data));

    setMessage("✅ Profile updated successfully!");

    // Wait a moment before redirecting
    setTimeout(() => {
      window.location.href = "/dashboard"; // ✅ Full reload ensures Dashboard loads cleanly
    }, 800);
  } catch (err) {
    console.error("Error updating profile:", err);
    setMessage("❌ Unable to update profile. Try again.");
  }
};



  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">Dashboard</h1>
        <h2 className="auth-title">Update Profile</h2>

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Update
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default UpdateProfile;
