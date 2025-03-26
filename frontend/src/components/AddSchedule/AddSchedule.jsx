import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";

function AddSchedule() {
    const navigate = useNavigate();
    const location = useLocation();
    const scheduleIds = location.state?.scheduleIds || []; // Get scheduleIds from state

    const [inputs, setInputs] = useState({
        scheduleId: "",
        gmail: "",
        moduleName: "",
        moduleId: "",
        scheduleDate: "",
        scheduleType: "",
        startTime: "",
        endTime: "",
    });

    const [errors, setErrors] = useState({
        scheduleId: "",
        gmail: "",
        moduleName: "",
        moduleId: "",
        scheduleDate: "",
        scheduleType: "",
        startTime: "",
        endTime: "",
    });

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

    const validate = () => {
        const newErrors = {};

        if (!inputs.scheduleId) newErrors.scheduleId = "Schedule ID is required";
        else if (scheduleIds.includes(inputs.scheduleId)) {
            newErrors.scheduleId = "Schedule ID must be unique";
        }
        if (!inputs.gmail) {
            newErrors.gmail = "Email is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(inputs.gmail)) {
            newErrors.gmail = "Enter a valid Gmail address (e.g., example@gmail.com)";
        }    
        if (!inputs.moduleId) newErrors.moduleId = "Module ID is required";
        if (!inputs.scheduleDate) newErrors.scheduleDate = "Schedule Date is required";
        if (!inputs.scheduleType) newErrors.scheduleType = "Schedule Type is required";
        if (!inputs.startTime) newErrors.startTime = "Start Time is required";
        if (!inputs.endTime) newErrors.endTime = "End Time is required";

        // Start Time must be earlier than End Time
        if (inputs.startTime && inputs.endTime && inputs.startTime >= inputs.endTime)
            newErrors.endTime = "End Time must be after Start Time";

        // Schedule Date must be today or in the future
        const currentDate = new Date().setHours(0, 0, 0, 0); // Set the current date to midnight
        const selectedDate = new Date(inputs.scheduleDate).setHours(0, 0, 0, 0); // Set the selected date to midnight
        if (selectedDate < currentDate) {
            newErrors.scheduleDate = "Schedule Date must be today or in the future";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await sendRequest();
            navigate("/scheduledetails");
        } catch (error) {
            console.error("Error adding schedule:", error);
        }
    };

    const sendRequest = async () => {
        try {
            const scheduleDateObj = new Date(inputs.scheduleDate);

            // Combine Date with Start Time
            const startDateTime = new Date(scheduleDateObj);
            const [startHours, startMinutes] = inputs.startTime.split(":");
            startDateTime.setHours(startHours, startMinutes, 0, 0);

            // Combine Date with End Time
            const endDateTime = new Date(scheduleDateObj);
            const [endHours, endMinutes] = inputs.endTime.split(":");
            endDateTime.setHours(endHours, endMinutes, 0, 0);

            const response = await axios.post("http://localhost:5000/schedules", {
                scheduleId: inputs.scheduleId,
                gmail: inputs.gmail,
                moduleName: inputs.moduleName,
                moduleId: inputs.moduleId,
                scheduleDate: scheduleDateObj.toISOString(),
                scheduleType: inputs.scheduleType,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
            });

            console.log("Schedule Added Successfully:", response.data);
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    return (
        <div>
            <AdminNavandSidebar /><br />

            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Schedule</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Schedule ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Schedule ID</label>
                        <input
                            type="text"
                            name="scheduleId"
                            value={inputs.scheduleId}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.scheduleId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.scheduleId && <span className="text-red-500 text-sm">{errors.scheduleId}</span>}
                    </div>

                    {/* Gmail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email (Gmail)</label>
                        <input
                            type="email"
                            name="gmail"
                            value={inputs.gmail}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.gmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.gmail && <span className="text-red-500 text-sm">{errors.gmail}</span>}
                    </div>

                    {/* Module Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Module Name</label>
                        <input
                            type="text"
                            name="moduleName"
                            value={inputs.moduleName}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.moduleName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                    </div>

                    {/* Module ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Module ID</label>
                        <input
                            type="text"
                            name="moduleId"
                            value={inputs.moduleId}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.moduleId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                    </div>

                    {/* Schedule Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Schedule Date</label>
                        <input
                            type="date"
                            name="scheduleDate"
                            value={inputs.scheduleDate}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.scheduleDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.scheduleDate && <span className="text-red-500 text-sm">{errors.scheduleDate}</span>}
                    </div>

                    {/* Schedule Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
                        <input
                            type="text"
                            name="scheduleType"
                            value={inputs.scheduleType}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.scheduleType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={inputs.startTime}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={inputs.endTime}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.endTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.endTime && <span className="text-red-500 text-sm">{errors.endTime}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            Add Schedule
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSchedule;
