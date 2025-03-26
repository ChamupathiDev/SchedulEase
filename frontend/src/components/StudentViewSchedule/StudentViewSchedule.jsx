import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";


const StudentViewSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [gmail, setGmail] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.gmail) {
            setGmail(user.gmail);

            // Clear previous schedules to avoid displaying outdated ones
            setSchedules([]);

            axios
                .get(`http://localhost:5000/schedules/gmail/${user.gmail}`)
                .then((response) => {
                    if (response.data.schedules) {
                        const today = new Date();
                        const todayString = today.toLocaleDateString("en-CA"); // Use 'en-CA' for YYYY-MM-DD format

                        const filteredSchedules = response.data.schedules.filter((schedule) => {
                            const scheduleDate = new Date(schedule.scheduleDate).toLocaleDateString("en-CA");
                            return scheduleDate === todayString; // Compare the date part only
                        });

                        setSchedules(filteredSchedules); // Set the filtered schedules
                    }
                })
                .catch((error) => console.error("Error fetching schedules:", error));
        }
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to format date
    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleDateString();
    };

    // Function to format time
    const formatTime = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    return (
        <div><Nav/>
        <div className="min-h-screen bg-gray-100 p-6">
            
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">My Schedule Details</h2>

                {schedules.length > 0 ? (
                    <div className="space-y-6">
                        {schedules.map((schedule) => (
                            <div
                                key={schedule._id}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-blue-700">{schedule.moduleName}</h3>
                                    <span className="text-gray-500 text-sm">{schedule.scheduleType}</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Module ID:</span>
                                        <span className="text-gray-600">{schedule.moduleId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Date:</span>
                                        <span className="text-gray-600">{formatDate(schedule.scheduleDate)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">Start Time:</span>
                                        <span className="text-gray-600">{formatTime(schedule.startTime)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">End Time:</span>
                                        <span className="text-gray-600">{formatTime(schedule.endTime)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-6">No schedules for today.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default StudentViewSchedules;
