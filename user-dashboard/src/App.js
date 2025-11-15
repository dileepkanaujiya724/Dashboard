import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import CreateUser from "./components/CreateUser";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/ResetPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset" element={<ResetPassword />} />


      </Routes>
    </Router>
  );
}

export default App;
