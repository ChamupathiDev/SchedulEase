import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";

function UpdateSchedule() {
    const [inputs, setInputs] = useState({
        scheduleId: "",
        email: "",
        moduleName: "",
        moduleId: "",
        Lecturer:"",
        DeliveryMode:"",
        scheduleDate: "",
        scheduleType: "",
        startTime: "",
        endTime: "",
    });

    const [errors, setErrors] = useState({
        scheduleId: "",
        email: "",
        moduleName: "",
        moduleId: "",
        Lecturer: "",
        DeliveryMode: "",
        scheduleDate: "",
        scheduleType: "",
        startTime: "",
        endTime: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`/api/schedules/${id}`);
                const data = res.data.schedule;

                const scheduleDate = data.scheduleDate.split("T")[0];
                const startTime = new Date(data.startTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
                const endTime = new Date(data.endTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });

                setInputs({
                    scheduleId: data.scheduleId,
                    email: data.email,
                    moduleName: data.moduleName,
                    moduleId: data.moduleId,
                    Lecturer: data.Lecturer,
                    DeliveryMode: data.DeliveryMode,
                    scheduleDate,
                    scheduleType: data.scheduleType,
                    startTime,
                    endTime,
                });
            } catch (error) {
                console.error("Error fetching schedule data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!inputs.email) {
            newErrors.email = "Email is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(inputs.email)) {
            newErrors.email = "Enter a valid Gmail address (e.g., example@gmail.com)";
        }
        if (!inputs.moduleName) newErrors.moduleName = "Module Name is required";
        if (!inputs.moduleId) newErrors.moduleId = "Module ID is required";
        if (!inputs.Lecturer) newErrors.Lecturer = "Lecturer name is required";
        if (!inputs.DeliveryMode) newErrors.DeliveryMode = "Delivery Mode is required";
        if (!inputs.scheduleType) newErrors.scheduleType = "Schedule Type is required";
        if (!inputs.scheduleDate) newErrors.scheduleDate = "Schedule Date is required";

        // Schedule Date must be today or in the future
        const currentDate = new Date().setHours(0, 0, 0, 0); // Set the current date to midnight
        const selectedDate = new Date(inputs.scheduleDate).setHours(0, 0, 0, 0); // Set the selected date to midnight
        if (selectedDate < currentDate) {
            newErrors.scheduleDate = "Schedule Date must be today or in the future";
        }
        if (!inputs.startTime) newErrors.startTime = "Start Time is required";
        if (!inputs.endTime) newErrors.endTime = "End Time is required";

        // Validate that End Time is after Start Time
        if (inputs.startTime && inputs.endTime && inputs.startTime >= inputs.endTime) {
            newErrors.endTime = "End Time must be after Start Time";
        }

        return newErrors;
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

            await axios.put(`/api/schedules/${id}`, {
                scheduleId: inputs.scheduleId,
                email: inputs.email,
                moduleName: inputs.moduleName,
                moduleId: inputs.moduleId,
                Lecturer: inputs.Lecturer,
                DeliveryMode: inputs.DeliveryMode,
                scheduleDate: scheduleDateObj.toISOString(),
                scheduleType: inputs.scheduleType,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
            });

            console.log("Schedule Updated Successfully");
        } catch (error) {
            console.error("Error updating schedule:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

        // Reset error message when the user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        await sendRequest();
        navigate("/scheduledetails");
    };

    return (
        <div>
            <AdminNavandSidebar /><br />
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Schedule</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Schedule ID</label>
                        <input
                            type="text"
                            name="scheduleId"
                            value={inputs.scheduleId}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border  rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                            readOnly
                        />
                        
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lecturer Name</label>
                        <input
                            type="text"
                            name="Lecturer"
                            value={inputs.Lecturer}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.Lecturer ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Delivery Mode</label>
                        <input
                            type="text"
                            name="DeliveryMode"
                            value={inputs.DeliveryMode}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.DeliveryMode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
                        <select
                            name="scheduleType"
                            value={inputs.scheduleType}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.scheduleType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        >
                            <option value="" disabled>Select schedule type</option>
                            <option value="fix">Fix</option>
                            <option value="flex">Flex</option>
                        </select>
                        {errors.scheduleType && <span className="text-red-500 text-sm">{errors.scheduleType}</span>}
                    </div>

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

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={inputs.startTime}
                            onChange={handleChange}
                            className={`w-full p-2 mt-1 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-200 focus:outline-none`}
                            required
                        />
                        {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
                    </div>

                    <div className="mt-4">
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSchedule;
