import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCourseModule() {
    const navigate = useNavigate();
    const [existingModules, setExistingModules] = useState([]);

    const [formData, setFormData] = useState({
        moduleName: "",
        moduleID: "",
        licName: "",
        licEmail: "",
        moduleCredit: ""
    });

    const [errors, setErrors] = useState({
        moduleName: "",
        moduleID: "",
        licName: "",
        licEmail: "",
        moduleCredit: ""
    });

    // State for controlling the popup message visibility
    const [popupMessage, setPopupMessage] = useState("");

    // Fetch existing modules on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/courses");
                // Ensure response contains an array
                setExistingModules(response.data.allCourses || []);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.moduleName.trim()) {
            newErrors.moduleName = "Module name is required";
            isValid = false;
        }

        if (!formData.moduleID.trim()) {
            newErrors.moduleID = "Module ID is required";
            isValid = false;
        } else if (Array.isArray(existingModules) && existingModules.some(m => m.moduleID === formData.moduleID)) {
            newErrors.moduleID = "Module ID already exists";
            isValid = false;
        }

        if (!formData.licName.trim()) {
            newErrors.licName = "Lecturer name is required";
            isValid = false;
        }

        if (!formData.licEmail.trim()) {
            newErrors.licEmail = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.licEmail)) {
            newErrors.licEmail = "Invalid email format";
            isValid = false;
        }

        if (!formData.moduleCredit || isNaN(formData.moduleCredit)) {
            newErrors.moduleCredit = "Valid credit value required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Ensure the formData contains the correct values
        const data = {
            moduleName: formData.moduleName,
            moduleID: formData.moduleID,
            licName: formData.licName,
            licEmail: formData.licEmail,
            moduleCredit: Number(formData.moduleCredit) // Convert moduleCredit to a number
        };

        try {
            const response = await axios.post("http://localhost:3000/api/courses", data);
            console.log("Course added successfully:", response.data);

            // Show success message
            setPopupMessage("Course module added successfully!");

            // Hide the popup after 3 seconds and then navigate to course table
            setTimeout(() => {
                setPopupMessage(""); // Hide the popup
                navigate("/courseTable"); // Navigate to course table
            }, 3000);

        } catch (error) {
            console.error("Error adding course:", error);
            if (error.response) {
                console.error("Backend error:", error.response?.data || error.message || error);
            }

            // Set a generic error message in case of failure
            setPopupMessage("Error adding course, please try again.");
        }
    };

    // Navigate to the home page
    const goToHome = () => {
        navigate("/"); // You can change "/" to your desired home page route
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-400 to-gray-300">
            <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Add New Course Module
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Module Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Module Name *
                            </label>
                            <input
                                type="text"
                                name="moduleName"
                                value={formData.moduleName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.moduleName ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.moduleName && (
                                <p className="mt-1 text-sm text-red-600">{errors.moduleName}</p>
                            )}
                        </div>

                        {/* Module ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Module ID *
                            </label>
                            <input
                                type="text"
                                name="moduleID"
                                value={formData.moduleID}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.moduleID ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.moduleID && (
                                <p className="mt-1 text-sm text-red-600">{errors.moduleID}</p>
                            )}
                        </div>

                        {/* Lecturer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lecturer Name *
                            </label>
                            <input
                                type="text"
                                name="licName"
                                value={formData.licName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.licName ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.licName && (
                                <p className="mt-1 text-sm text-red-600">{errors.licName}</p>
                            )}
                        </div>

                        {/* Lecturer Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lecturer Email *
                            </label>
                            <input
                                type="email"
                                name="licEmail"
                                value={formData.licEmail}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.licEmail ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.licEmail && (
                                <p className="mt-1 text-sm text-red-600">{errors.licEmail}</p>
                            )}
                        </div>

                        {/* Module Credit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Module Credit *
                            </label>
                            <input
                                type="number"
                                name="moduleCredit"
                                min="1"
                                value={formData.moduleCredit}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.moduleCredit ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors.moduleCredit && (
                                <p className="mt-1 text-sm text-red-600">{errors.moduleCredit}</p>
                            )}
                        </div>

                        <div className="flex justify-between space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={goToHome} // Go to home page
                                className="px-4 py-2 bg-red-400 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-red-600"
                            >
                                Go to Home
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-400 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Course
                            </button>
                        </div>
                    </form>

                    {/* Popup message */}
                    {popupMessage && (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-500 rounded-md">
                            {popupMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddCourseModule;
