import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";
import Footer from "../components/Footer";

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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.id]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
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
      setError(true);
    }
  };

  return (
 
    
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50 font-Poppins" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg")' }}>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1 font-medium">Full Name</label>
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
          <div className="flex flex-col">
            <label htmlFor="studentid" className="mb-1 font-medium">Student ID</label>
            <input
              type="text"
              placeholder="Student ID"
              id="studentid" 
              value={formData.studentid}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              placeholder="Date of Birth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-slate-100 p-3 rounded-lg w-full"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium">Address</label>
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
          <div className="flex flex-col">
            <label htmlFor="degreeProgram" className="mb-1 font-medium">Degree Program</label>
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
          <div className="flex flex-col">
            <label htmlFor="faculty" className="mb-1 font-medium">Faculty</label>
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
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 font-medium">Gender</label>
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
        {error && <p className="text-red-700 mt-5 text-center">Something went wrong!</p>}
      </div>
      
    </div>
  
    
  );
}
