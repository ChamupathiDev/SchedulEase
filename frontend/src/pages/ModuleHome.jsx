import React from "react";
import { useNavigate } from "react-router-dom";

const ModuleHome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <AdminNavandSidebar/><br/><br/>
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Course Module Management
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Module Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Add Module</h2>
          <p className="text-gray-600 mb-4">
            Create a new module by filling out the form.
          </p>
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/add-module")}
          >
            Go to Add Module
          </button>
        </div>

        {/* Module List Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Module List</h2>
          <p className="text-gray-600 mb-4">View and manage existing modules.</p>
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/modules")}
          >
            Go to Module List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleHome;
