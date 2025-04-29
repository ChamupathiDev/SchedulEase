import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { signOut } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Construct the full URL for the profile image.
  const backendUrl = "http://localhost:3000";
  const profileImageUrl =
    currentUser &&
    currentUser.profilePicture &&
    currentUser.profilePicture.startsWith("uploads/")
      ? `${backendUrl}/${currentUser.profilePicture.replace(/\\/g, "/")}`
      : currentUser?.profilePicture || "";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/signout");
      dispatch(signOut());
      toast.success("Signed out successfully!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 1000);
    } catch (err) {
      toast.error("Sign out failed!");
    }
  };

  // Close dropdown if clicked outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-black text-white font-Poppins relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
          <FaRegCalendarAlt className="text-xl text-blue-600" /> 
          <h1 className="font-bold">SchedulEase</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/contact">
            <li>Contact us</li>
          </Link>
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={profileImageUrl}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
