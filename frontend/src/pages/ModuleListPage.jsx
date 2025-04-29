import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ModuleListPage = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch modules from localStorage when the component mounts
  useEffect(() => {
    const storedModules = JSON.parse(localStorage.getItem("modules")) || [];
    setModules(storedModules);
  }, []);

  // Function to handle deleting a module with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this module?");
    if (confirmDelete) {
      const updatedModules = modules.filter((module) => module.moduleId !== id);
      setModules(updatedModules);

      // Update localStorage with the new list of modules
      localStorage.setItem("modules", JSON.stringify(updatedModules));
    }
  };

  // Function to handle editing a module
  const handleEdit = (module) => {
    // Navigate to the EditModules page and pass module data using the state
    navigate(`/edit-module/${module.moduleId}`, { state: { module } });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-6">Module List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Module Name</th>
            <th className="px-4 py-2">Module ID</th>
            <th className="px-4 py-2">Credits</th>
            <th className="px-4 py-2">LIC Name</th>
            <th className="px-4 py-2">LIC Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.length > 0 ? (
            modules.map((module) => (
              <tr key={module.moduleId}>
                <td className="px-4 py-2">{module.moduleName}</td>
                <td className="px-4 py-2">{module.moduleId}</td>
                <td className="px-4 py-2">{module.moduleCredits}</td>
                <td className="px-4 py-2">{module.licName}</td>
                <td className="px-4 py-2">{module.licEmail}</td>
                <td className="px-4 py-2 flex space-x-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(module)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>

                  {/* Delete Button with Confirmation */}
                  <button
                    onClick={() => handleDelete(module.moduleId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">No modules available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/module-home" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
        Back to Add Module
      </Link>
    </div>
  );
};

export default ModuleListPage;
