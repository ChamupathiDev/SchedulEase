import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signin", formData);
      dispatch(signInSuccess(res.data));
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(
        "Submission error:",
        err.response ? err.response.data : err.message
      );
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(signInFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/university-student-writing-while-using-600nw-2442495581.jpg')",
        }}
      ></div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 font-Poppins">
        <div className="p-6 max-w-lg w-full">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="bg-slate-100 p-3 rounded-lg"
                onChange={handleChange}
              />
              
              {/* Password Field with Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="bg-slate-100 p-3 rounded-lg w-full pr-10"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEye className="text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-gray-600" />
                  )}
                </button>
              </div>

              <button
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
              <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
              <p>{"Don't Have an account?"}</p>
              <Link to="/sign-up">
                <span className="text-blue-500">Sign up</span>
              </Link>
            </div>
            <div className="flex gap-2 mt-2">
              <p>Admin login</p>
              <a href="/adminlogin" className="text-blue-500">
                Admin login
              </a>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
