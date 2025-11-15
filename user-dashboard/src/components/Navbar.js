import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout, MdManageAccounts } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";

const Navbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2 className="logo">My Dashboard</h2>
      <div className="user-menu">
        <FaUserCircle
          size={32}
          className="user-icon"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="dropdown">
            <p className="dropdown-user">{user?.name}</p>
            <button onClick={() => navigate("/update-profile")}>
              <MdManageAccounts /> Update Profile
            </button>
            <button onClick={() => navigate("/forgot-password")}>
              <AiOutlineUnlock /> Forgot Password
            </button>
            <button onClick={handleLogout}>
              <MdLogout /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
