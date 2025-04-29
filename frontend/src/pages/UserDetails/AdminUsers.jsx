import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("faculty");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/user/${userId}`);
        fetchUsers(); // refresh list after deletion
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    doc.setFontSize(18);
    doc.text("User Details", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const tableColumn = [
      "Full Name",
      "Student ID",
      "Email",
      "Date of Birth",
      "Phone",
      "Address",
      "Degree Program",
      "Faculty",
      "Gender",
    ];
    const tableRows = [];

    filteredUsers.forEach((user) => {
      const userData = [
        user.fullName,
        user.studentid,
        user.email,
        new Date(user.dateOfBirth).toLocaleDateString(),
        user.phoneNumber,
        user.address,
        user.degreeProgram,
        user.faculty,
        user.gender,
      ];
      tableRows.push(userData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("users.pdf");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = users.filter((user) => {
        const value = user[selectedCategory];
        return value
          ? value.toString().toLowerCase().includes(lowerQuery)
          : false;
      });
      setFilteredUsers(filtered);
    }
  };

  return (
    <div>
      <AdminNavandSidebar />
      <br />
      <br />
      <div className="min-h-screen p-6">
        {/* Centered Search Bar */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-1 rounded-md px-6 "
            >
              <option value="Category">Select Category</option>
              <option value="faculty">Faculty</option>
              <option value="studentid">Student ID</option>
              <option value="degreeProgram">Degree Program</option>
              <option value="gender">Gender</option>
              <option value="email">Email</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 px-24 rounded"
            />
            <button
              onClick={handleSearch}
              className="px-12 py-0 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 ">All Users</h1>
        {/* Download PDF Button */}
        <div className="flex mb-4">
          <button
            onClick={generatePdf}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download PDF
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">Full Name</th>
                <th className="border p-2">Student ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Date of Birth</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Degree Program</th>
                <th className="border p-2">Faculty</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2">{user.fullName}</td>
                  <td className="border p-2">{user.studentid}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{user.phoneNumber}</td>
                  <td className="border p-2">{user.address}</td>
                  <td className="border p-2">{user.degreeProgram}</td>
                  <td className="border p-2">{user.faculty}</td>
                  <td className="border p-2">{user.gender}</td>
                  <td className="border p-8 flex space-x-6">
                    <button
                      onClick={() => navigate(`/updateuser/${user._id}`)}
                      title="Edit"
                    >
                      <FaEdit className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      title="Delete"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
