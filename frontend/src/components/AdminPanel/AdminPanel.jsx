import React, { useState } from "react";
import { Menu, X, User, Settings, LogOut, Home, Users } from "lucide-react";

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 transition-all duration-300 flex flex-col shadow-lg`}
      >
        <button
          className="mb-6 p-3 rounded bg-gray-600 hover:bg-gray-500 transition"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={10} /> : <Menu size={10} />}
        </button>
        <h2 className={`text-3xl font-extrabold tracking-wide transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}>Admin Panel</h2>
        <nav className="mt-6 space-y-3">
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <Home size={24} />
            {isSidebarOpen && <span className="text-lg">Dashboard</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <Users size={24} />
            {isSidebarOpen && <span className="text-lg">Users</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <Settings size={24} />
            {isSidebarOpen && <span className="text-lg">Settings</span>}
          </a>
          <a href="#" className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 transition">
            <LogOut size={24} />
            {isSidebarOpen && <span className="text-lg">Logout</span>}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-md p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="relative">
            <button className="flex items-center space-x-3 bg-gray-200 px-5 py-3 rounded-lg shadow-md hover:bg-gray-300 transition">
              <User size={24} />
              <span className="text-lg">Admin</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800">Welcome to the Admin Panel</h3>
            <p className="text-gray-600 mt-2">Manage your application effectively from here.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;