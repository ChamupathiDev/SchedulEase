import { useSelector } from "react-redux";
import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from "../redux/user/userSlice.js";
import axios from "axios";
import Footer from "../components/Footer.jsx";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(`/api/user/update/${currentUser._id}`, formData);
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
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`, formData);
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
        {/* Profile Card Design */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-24 w-24 cursor-pointer rounded-full object-cover"
                onClick={() => fileRef.current.click()}
              />
            </div>

            {/* Input Fields */}
            <input
              defaultValue={currentUser.username}
              type="text"
              id="username"
              placeholder="Username"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />

            {/* Update Button */}
            <button
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
          </form>
        </div>

        {/* Action Buttons - Outside the form */}
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

        {/* Error and Success Messages */}
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-green-700 mt-5">{updateSuccess && "User updated successfully!"}</p>
      </div>
      
      {/* Footer */}
      <Footer />
      
    </div>

  );
}
