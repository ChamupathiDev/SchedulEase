
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
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


  return (
    <div><AdminNavandSidebar/><br/><br/>
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
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
            {users.map((user) => (
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
