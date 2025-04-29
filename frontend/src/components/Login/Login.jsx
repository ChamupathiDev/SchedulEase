import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const [gmail, setGmail] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { gmail });

      alert(`Welcome, ${res.data.user.name}!`);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data in localStorage
      navigate("/userdetails"); // Redirect to user details page
    } catch (err) {
      alert("Email not found");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Check if user is already logged in and show a logout button
  const isLoggedIn = localStorage.getItem("user");

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>You are already logged in</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              placeholder="Enter email"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
