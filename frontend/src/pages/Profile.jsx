import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice.js";
import axios from "axios";
import Footer from "../components/Footer.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Validation helper functions
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
  const phoneRegex = /^\+94\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return "Phone number must be in the format +947XXXXXXXX.";
  }
  return "";
};

export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const MASKED_PASSWORD = "********";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    studentid: "",
    email: "",
    password: MASKED_PASSWORD,
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    degreeProgram: "",
    faculty: "",
    gender: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        studentid: currentUser.studentid || "",
        email: currentUser.email || "",
        password: MASKED_PASSWORD,
        dateOfBirth: currentUser.dateOfBirth
          ? currentUser.dateOfBirth.substring(0, 10)
          : "",
        phoneNumber: currentUser.phoneNumber || "",
        address: currentUser.address || "",
        degreeProgram: currentUser.degreeProgram || "",
        faculty: currentUser.faculty || "",
        gender: currentUser.gender || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    let errMsg = "";
    if (id === "email") errMsg = validateEmail(value);
    if (id === "studentid") errMsg = validateStudentId(value);
    if (id === "password" && value !== MASKED_PASSWORD)
      errMsg = validatePassword(value);
    if (id === "dateOfBirth") errMsg = validateDateOfBirth(value);
    if (id === "phoneNumber") errMsg = validatePhoneNumber(value);

    setErrors((prev) => ({ ...prev, [id]: errMsg }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataImage = new FormData();
    formDataImage.append("profilePicture", file);
    try {
      const res = await axios.post(
        "/api/user/upload-profile-picture",
        formDataImage,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(updateUserSuccess(res.data));
      toast.success("Profile picture updated successfully!");
    } catch (err) {
      console.error(
        "File upload error:",
        err.response ? err.response.data : err.message
      );
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("User not found. Please sign in again.");
      return;
    }
    const newErrors = {
      email: validateEmail(formData.email),
      studentid: validateStudentId(formData.studentid),
      dateOfBirth: validateDateOfBirth(formData.dateOfBirth),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
    };
    if (formData.password !== MASKED_PASSWORD) {
      newErrors.password = validatePassword(formData.password);
    }
    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key]
    );
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      dispatch(updateUserStart());
      const payload = { ...formData };
      if (payload.password === MASKED_PASSWORD) delete payload.password;
      const res = await axios.post(
        `/api/user/update/${currentUser._id}`,
        payload
      );
      dispatch(updateUserSuccess(res.data));
      toast.success("User updated successfully!");
    } catch (err) {
      console.error(
        "Update error:",
        err.response ? err.response.data : err.message
      );
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(updateUserFailure(errorMsg));
      toast.error(errorMsg || "Something went wrong!");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      dispatch(deleteUserSuccess(res.data));
      setTimeout(() => {
        toast.success("Account deleted successfully!");
      }, 1000);
      navigate("/sign-in");
    } catch (err) {
      console.error(
        "Delete error:",
        err.response ? err.response.data : err.message
      );
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(deleteUserFailure(errorMsg));
      toast.error(errorMsg || "Something went wrong!");
    }
  };

  // Construct full URL for profile image.
  const backendUrl = "http://localhost:3000";
  const profileImageUrl =
    currentUser &&
    currentUser.profilePicture &&
    currentUser.profilePicture.startsWith("uploads/")
      ? `${backendUrl}/${currentUser.profilePicture.replace(/\\/g, "/")}`
      : currentUser?.profilePicture || "";

  return (
    <div className="min-h-screen bg-cover bg-top font-Poppins bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] mt-[-40px]">
      <div className="p-3 max-w-2xl mx-auto mt-10">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
          {currentUser ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="flex justify-center mb-4">
                <img
                  src={profileImageUrl}
                  alt="profile"
                  className="h-24 w-24 cursor-pointer rounded-full object-cover"
                  onClick={() => fileRef.current && fileRef.current.click()}
                />
              </div>
              {/* Full Name */}
              <div className="flex flex-col">
                <label htmlFor="fullName" className="mb-1 font-medium">
                  Full Name
                </label>
                <input
                  value={formData.fullName}
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Student ID */}
              <div className="flex flex-col">
                <label htmlFor="studentid" className="mb-1 font-medium">
                  Student ID
                </label>
                <input
                  value={formData.studentid}
                  type="text"
                  id="studentid"
                  placeholder="e.g., IT12345"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
                  required
                />
                {errors.studentid && (
                  <span className="text-red-500 text-sm">
                    {errors.studentid}
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">
                  Email
                </label>
                <input
                  value={formData.email}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
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
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="w-full bg-slate-100 rounded-lg p-3 pr-10"
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
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
                  value={formData.dateOfBirth}
                  type="date"
                  id="dateOfBirth"
                  placeholder="Date of Birth"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
                  required
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm">
                    {errors.dateOfBirth}
                  </span>
                )}
              </div>
              {/* Phone Number */}
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  value={formData.phoneNumber}
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number (e.g., +1 1234567890)"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
                  required
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
              {/* Address */}
              <div className="flex flex-col">
                <label htmlFor="address" className="mb-1 font-medium">
                  Address
                </label>
                <input
                  value={formData.address}
                  type="text"
                  id="address"
                  placeholder="Address"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Degree Program */}
              <div className="flex flex-col">
                <label htmlFor="degreeProgram" className="mb-1 font-medium">
                  Degree Program
                </label>
                <input
                  value={formData.degreeProgram}
                  type="text"
                  id="degreeProgram"
                  placeholder="Degree Program"
                  className="w-full bg-slate-100 rounded-lg p-3"
                  onChange={handleChange}
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
                  className="w-full bg-slate-100 rounded-lg p-3"
                  required
                >
                  <option value="">Select Faculty</option>
                  <option value="Faculty of Computing">
                    Faculty of Computing
                  </option>
                  <option value="Faculty of Engineering">
                    Faculty of Engineering
                  </option>
                  <option value="Faculty of Business">
                    Faculty of Business
                  </option>
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
                  className="w-full bg-slate-100 rounded-lg p-3"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                className="bg-slate-700 text-white w-full p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Delete Account
              </button>
            </form>
          ) : (
            <p>User not found. Please sign in again.</p>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
