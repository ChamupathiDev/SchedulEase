// AdminEditUser.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";

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

export default function AdminEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    studentid: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    degreeProgram: "",
    faculty: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/user/${id}`);
      setFormData({
        ...res.data,
        dateOfBirth: res.data.dateOfBirth.substring(0, 10),
      });
      setLoading(false);
    } catch (err) {
      console.error("Fetch user error:", err);
      setError("Failed to fetch user");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    let errMsg = "";
    if (id === "email") errMsg = validateEmail(value);
    if (id === "studentid") errMsg = validateStudentId(value);
    if (id === "dateOfBirth") errMsg = validateDateOfBirth(value);
    if (id === "phoneNumber") errMsg = validatePhoneNumber(value);

    setErrors((prev) => ({ ...prev, [id]: errMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(formData.email),
      studentid: validateStudentId(formData.studentid),
      dateOfBirth: validateDateOfBirth(formData.dateOfBirth),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
    };
    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key]
    );
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      await axios.put(`/api/admin/user/${id}`, formData);
      setLoading(false);
      navigate("/userdetails");
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update user");
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavandSidebar />
      <br />
      <br />
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Edit User</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white p-6 shadow-md rounded-md">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="studentid" className="mb-1">
                Student ID
              </label>
              <input
                id="studentid"
                value={formData.studentid}
                onChange={handleChange}
                className="border p-2"
                required
              />
              {errors.studentid && (
                <span className="text-red-500 text-sm">{errors.studentid}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2"
                required
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="dateOfBirth" className="mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="border p-2"
                required
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">
                  {errors.dateOfBirth}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border p-2"
                required
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="mb-1">
                Address
              </label>
              <input
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="degreeProgram" className="mb-1">
                Degree Program
              </label>
              <input
                id="degreeProgram"
                value={formData.degreeProgram}
                onChange={handleChange}
                className="border p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="faculty" className="mb-1">
                Faculty
              </label>
              <select
                id="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="border p-2"
                required
              >
                <option value="">Select Faculty</option>
                <option value="Faculty of Computing">
                  Faculty of Computing
                </option>
                <option value="Faculty of Engineering">
                  Faculty of Engineering
                </option>
                <option value="Faculty of Business">Faculty of Business</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded-md font-bold cursor-pointer hover:bg-blue-600 transition duration-300">Update User</button>
            </div>
            {error && (
              <p className="text-red-700 mt-5">Something went wrong!</p>
            )}
            {updateSuccess && (
              <p className="text-green-700 mt-5">User updated successfully!</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
