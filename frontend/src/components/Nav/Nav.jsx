import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("user");

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white text-3xl font-bold">
            <Link to="/">📚 SchedulEase</Link>
          </div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <Link to="/mainhome" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/viewstudentschedule" className="hover:text-gray-200">
                My Schedules
              </Link>
            </li>
            <li>
              <Link to="/adminlogin" className="hover:text-gray-200">
                Admin Login
              </Link>
            </li>
            {isLoggedIn && (
              <li>
              <button 
  onClick={handleLogout}
  className="bg-red-400 bg-opacity-40 backdrop-blur-md text-white font-semibold py-1.5 px-5 rounded-lg border border-red-300 shadow-lg hover:bg-opacity-50 transition duration-300"
>
  Logout
</button>



              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
