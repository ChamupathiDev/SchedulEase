// signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Helper validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  if (!email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) {
    return "Only Gmail and Yahoo email addresses are allowed.";
  }
  return "";
};

const validateStudentId = (id) => {
  // Must start with IT, BS, or EG followed by exactly 5 digits
  const studentIdRegex = /^(IT|BS|EG)\d{5}$/;
  if (!studentIdRegex.test(id)) {
    return "Student ID must start with IT, BS, or EG followed by 5 numbers.";
  }
  return "";
};

const validatePassword = (password) => {
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

const validateDateOfBirth = (dob) => {
  const date = new Date(dob);
  if (isNaN(date.getTime())) return "Invalid date of birth";
  const today = new Date();
  if (date > today) return "Date of birth cannot be in the future.";
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  const dayDiff = today.getDate() - date.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  if (age < 18) return "You must be at least 18 years old.";
  return "";
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?\d{1,3}\s?\d{7,11}$/;
  if (!phoneRegex.test(phone)) {
    return "Phone number must include country code (e.g., +1 1234567890).";
  }
  return "";
};

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentid: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    degreeProgram: "",
    faculty: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validate individual fields on change
    let errMsg = "";
    if (id === "email") errMsg = validateEmail(value);
    if (id === "studentid") errMsg = validateStudentId(value);
    if (id === "password") errMsg = validatePassword(value);
    if (id === "dateOfBirth") errMsg = validateDateOfBirth(value);
    if (id === "phoneNumber") errMsg = validatePhoneNumber(value);

    setErrors((prev) => ({ ...prev, [id]: errMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Final validation before submitting
    const newErrors = {
      email: validateEmail(formData.email),
      studentid: validateStudentId(formData.studentid),
      password: validatePassword(formData.password),
      dateOfBirth: validateDateOfBirth(formData.dateOfBirth),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
    };

    // Remove keys with no error
    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key]
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrorSubmit(false);
      const res = await axios.post("/api/auth/signup", formData);
      console.log(res.data);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      console.error(
        "Submission error:",
        error.response ? error.response.data : error.message
      );
      setLoading(false);
      setErrorSubmit(true);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50 font-Poppins"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg")',
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          {/* Student ID */}
          <div className="flex flex-col">
            <label htmlFor="studentid" className="mb-1 font-medium">
              Student ID
            </label>
            <input
              type="text"
              placeholder="e.g., IT12345"
              id="studentid"
              value={formData.studentid}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
            {errors.studentid && (
              <span className="text-red-500 text-sm">{errors.studentid}</span>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          {/* Password with Toggle */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full pr-10"
              required
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="mb-1 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              placeholder="Date of Birth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>
            )}
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number (e.g., +1 1234567890)"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
            )}
          </div>
          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          {/* Degree Program */}
          <div className="flex flex-col">
            <label htmlFor="degreeProgram" className="mb-1 font-medium">
              Degree Program
            </label>
            <input
              type="text"
              placeholder="Degree Program"
              id="degreeProgram"
              value={formData.degreeProgram}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          {/* Faculty */}
          <div className="flex flex-col">
            <label htmlFor="faculty" className="mb-1 font-medium">
              Faculty
            </label>
            <select
              id="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            >
              <option value="">Select Faculty</option>
              <option value="Faculty of Computing">Faculty of Computing</option>
              <option value="Faculty of Engineering">Faculty of Engineering</option>
              <option value="Faculty of Business">Faculty of Business</option>
            </select>
          </div>
          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 font-medium">
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5 justify-center">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        {errorSubmit && (
          <p className="text-red-700 mt-5 text-center">
            Something went wrong!
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
