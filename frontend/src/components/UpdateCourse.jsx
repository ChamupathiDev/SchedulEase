import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import the toast function

function UpdateCourse() {
    const [inputs, setInputs] = useState({
        moduleName: "",
        moduleID: "",
        licName: "",
        licEmail: "",
        moduleCredit: ""
    });

    const [errors, setErrors] = useState({
        licName: "",
        licEmail: "",
        moduleCredit: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the course data on mount
    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/courses/${id}`);
                const data = res.data.data; 
                setInputs({
                    moduleName: data.moduleName,
                    moduleID: data.moduleID,
                    licName: data.licName,
                    licEmail: data.licEmail,
                    moduleCredit: data.moduleCredit
                });
            } catch (error) {
                console.error("Error fetching course data:", error.response?.data || error.message);
            }
        };
        
        fetchHandler();
    }, [id]);

    // Validation function
    const validate = () => {
        const newErrors = {};

        if (!inputs.licName.trim()) {
            newErrors.licName = "Lecturer name is required";
        }
        if (!inputs.licEmail.trim()) {
            newErrors.licEmail = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.licEmail)) {
            newErrors.licEmail = "Enter a valid email address";
        }
        if (!inputs.moduleCredit || isNaN(inputs.moduleCredit)) {
            newErrors.moduleCredit = "Valid credit value required";
        } else if (inputs.moduleCredit <= 0) {
            newErrors.moduleCredit = "Credit must be positive";
        }

        return newErrors;
    };

    // Function to send PUT request to update the course
    const sendRequest = async () => {
        try {
          
            await axios.put(`http://localhost:3000/api/courses/${id}`, {
                moduleName: inputs.moduleName,
                moduleID: inputs.moduleID,
                licName: inputs.licName,
                licEmail: inputs.licEmail,
                moduleCredit: Number(inputs.moduleCredit)
            });
            toast.success("Course module updated successfully!"); // Show success toast
            navigate("/courseTable"); // Redirect after successful update
        } catch (error) {
            console.error("Error updating course:", error.response?.data || error.message);
            toast.error("Error updating course module!"); // Show error toast
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

        // Reset error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        await sendRequest();
    };

    return (
        <div>
            
        <div className="min-h-screen bg-gradient-to-r from-slate-400 to-gray-300 ">
            <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">  </div>
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Course Module</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Read-only fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Module Name</label>
                        <input
                            type="text"
                            value={inputs.moduleName}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Module ID</label>
                        <input
                            type="text"
                            value={inputs.moduleID}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-lg bg-gray-100"
                            readOnly
                        />
                    </div>

                    {/* Editable fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lecturer Name *</label>
                        <input
                            type="text"
                            name="licName"
                            value={inputs.licName}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.licName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.licName && <span className="text-red-500 text-sm">{errors.licName}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lecturer Email *</label>
                        <input
                            type="email"
                            name="licEmail"
                            value={inputs.licEmail}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.licEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.licEmail && <span className="text-red-500 text-sm">{errors.licEmail}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Module Credit *</label>
                        <input
                            type="number"
                            name="moduleCredit"
                            min="1"
                            value={inputs.moduleCredit}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.moduleCredit ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.moduleCredit && <span className="text-red-500 text-sm">{errors.moduleCredit}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update Course
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default UpdateCourse;
