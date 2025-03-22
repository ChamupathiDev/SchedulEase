import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditModules = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate();
  const moduleData = location.state?.module; // Access module data passed via state

  const [module, setModule] = useState(moduleData || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!moduleData) {
      // If no data was passed, navigate back to the list page
      navigate("/modules");
    }
  }, [moduleData, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Updated Module Data:", module);
      // Update the module in localStorage
      let existingModules = JSON.parse(localStorage.getItem("modules")) || [];
      const updatedModules = existingModules.map((mod) =>
        mod.moduleId === module.moduleId ? module : mod
      );
      localStorage.setItem("modules", JSON.stringify(updatedModules));

      alert("Module updated successfully!");
      navigate("/modules"); // Navigate back to the list page after submission
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!module.moduleName) newErrors.moduleName = "Module Name is required";
    if (!module.moduleId) newErrors.moduleId = "Module ID is required";
    if (!module.moduleCredits) newErrors.moduleCredits = "Credits are required";
    if (!module.licName) newErrors.licName = "LIC Name is required";
    if (!module.licEmail || !/\S+@\S+\.\S+/.test(module.licEmail))
      newErrors.licEmail = "Valid LIC Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setModule({ ...module, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Edit Module</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold">Module Name</label>
          <input
            type="text"
            name="moduleName"
            value={module.moduleName || ""}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md"
          />
          {errors.moduleName && (
            <p className="text-red-500 text-sm">{errors.moduleName}</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-semibold">Module ID</label>
          <input
            type="text"
            name="moduleId"
            value={module.moduleId || ""}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md"
          />
          {errors.moduleId && (
            <p className="text-red-500 text-sm">{errors.moduleId}</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-semibold">Module Credits</label>
          <input
            type="number"
            name="moduleCredits"
            value={module.moduleCredits || ""}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md"
          />
          {errors.moduleCredits && (
            <p className="text-red-500 text-sm">{errors.moduleCredits}</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-semibold">LIC Name</label>
          <input
            type="text"
            name="licName"
            value={module.licName || ""}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md"
          />
          {errors.licName && (
            <p className="text-red-500 text-sm">{errors.licName}</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-semibold">LIC Email</label>
          <input
            type="email"
            name="licEmail"
            value={module.licEmail || ""}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md"
          />
          {errors.licEmail && (
            <p className="text-red-500 text-sm">{errors.licEmail}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="w-full bg-gray-500 text-black py-3 rounded-md hover:bg-gray-600"
            onClick={() => navigate("/modules")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-black py-3 rounded-md hover:bg-blue-600"
          >
            Update Module
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModules;
