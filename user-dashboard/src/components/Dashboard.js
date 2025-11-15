import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserEdit, FaUpload } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);

  // ✅ Safely load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } else {
        navigate("/signin");
      }
    } catch (err) {
      console.error("Invalid user data in localStorage:", err);
      localStorage.removeItem("user");
      navigate("/signin");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="dashboard-container">
        <p>Loading user information...</p>
      </div>
    );
  }

  // Handle avatar upload
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">My Dashboard</h2>

        <div className="profile-menu-container">
          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            className="profile-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img
                  src={
                    user.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className="dropdown-avatar"
                />
                <div>
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
              </div>

              <hr />

              <button
                className="menu-item"
                onClick={() => fileInputRef.current.click()}
              >
                <FaUpload /> Upload Photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />

              <button
                onClick={() => navigate("/update")}
                className="menu-item"
              >
                <FaUserEdit /> Update Profile
              </button>

              <button onClick={handleLogout} className="menu-item logout">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-content">
        <h1>Welcome {user.name || "User"}!</h1>
        <p>This is your dashboard page.</p>
      </main>
    </div>
  );
}

export default Dashboard;
