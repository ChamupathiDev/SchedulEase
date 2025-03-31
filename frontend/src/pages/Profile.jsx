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
  signOut 
} from "../redux/user/userSlice.js";
import axios from "axios";
import Footer from "../components/Footer.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const MASKED_PASSWORD = "********";

  // Initialize formData from currentUser when available.
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
        password: MASKED_PASSWORD, // masked password
        dateOfBirth: currentUser.dateOfBirth ? currentUser.dateOfBirth.substring(0, 10) : "",
        phoneNumber: currentUser.phoneNumber || "",
        address: currentUser.address || "",
        degreeProgram: currentUser.degreeProgram || "",
        faculty: currentUser.faculty || "",
        gender: currentUser.gender || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const payload = { ...formData };
      // Remove password field if not updated
      if (payload.password === MASKED_PASSWORD) {
        delete payload.password;
      }
      const res = await axios.post(`/api/user/update/${currentUser._id}`, payload);
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true);
    } catch (err) {
      console.error(
        "Update error:",
        err.response ? err.response.data : err.message
      );
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(updateUserFailure(errorMsg));
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.get('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`, { data: formData });
      dispatch(deleteUserSuccess(res.data));
    } catch (err) {
      console.error(
        "Delete error:",
        err.response ? err.response.data : err.message
      );
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(deleteUserFailure(errorMsg));
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-top bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')] mt-[-40px]">
      <div className="p-3 max-w-lg mx-auto mt-10">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Profile Picture (Default, no update functionality yet) */}
            <div className="flex justify-center mb-4">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-24 w-24 cursor-pointer rounded-full object-cover"
                onClick={() => fileRef.current && fileRef.current.click()}
              />
            </div>

            {/* Full Name */}
            <input
              value={formData.fullName}
              type="text"
              id="fullName"
              placeholder="Full Name"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Username */}
            <input
              value={formData.studentid}
              type="text"
              id="studentid"
              placeholder="Username"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              value={formData.email}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Password with Toggle */}
            <div className="relative w-full">
              <input
                value={formData.password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full bg-slate-100 rounded-lg p-3 pr-10"
                onChange={handleChange}
              />
              <div 
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            {/* Date of Birth */}
            <input
              value={formData.dateOfBirth}
              type="date"
              id="dateOfBirth"
              placeholder="Date of Birth"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Phone Number */}
            <input
              value={formData.phoneNumber}
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Address */}
            <input
              value={formData.address}
              type="text"
              id="address"
              placeholder="Address"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Degree Program */}
            <input
              value={formData.degreeProgram}
              type="text"
              id="degreeProgram"
              placeholder="Degree Program"
              className="w-full bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
              required
            />

            {/* Faculty Dropdown */}
            <select
              id="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="w-full bg-slate-100 rounded-lg p-3"
              required
            >
              <option value="">Select Faculty</option>
              <option value="Faculty of Computing">Faculty of Computing</option>
              <option value="Faculty of Engineering">Faculty of Engineering</option>
              <option value="Faculty of Business">Faculty of Business</option>
            </select>

            {/* Gender Dropdown */}
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

            {/* Update Button */}
            <button
              className="bg-slate-700 text-white w-full p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-5">
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none"
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Sign Out
          </button>
        </div>

        {/* Messages */}
        {error && <p className="text-red-700 mt-5">Something went wrong!</p>}
        {updateSuccess && <p className="text-green-700 mt-5">User updated successfully!</p>}
      </div>
      <Footer />
    </div>
  );
}
