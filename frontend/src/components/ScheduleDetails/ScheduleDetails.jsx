import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/schedules";

const fetchSchedules = async () => {
    return await axios.get(URL).then((res) => res.data);
};

function ScheduleDetails() {
    const [schedules, setScheduleDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scheduleIds, setScheduleIds] = useState([]); // Optional: keep if you want to track IDs separately
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();
    const ComponentsRef = useRef(); // Corrected ref variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSchedules();
                setScheduleDetails(data.schedules);
                const ids = data.schedules.map((schedule) => schedule.scheduleId);
                setScheduleIds(ids);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            setScheduleDetails(schedules.filter((schedule) => schedule._id !== id));
        } catch (error) {
            console.error("Error deleting schedule:", error);
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return isoString.split("T")[0];
    };

    const formatTime = (isoString) => {
        if (!isoString || isoString === "Invalid Date") return "N/A";
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const handleAddSchedule = () => {
        navigate("/addschedule", { state: { scheduleIds } });
    };

    // report generation part
    const handlePrint = useReactToPrint({
        contentRef: ComponentsRef, // Use contentRef instead of content callback
        documentTitle: "Schedule Reports",
        onAfterPrint: () => alert("Schedule report successfully generated!"),
    });

    const handleSearch = async () => {
        try {
            const data = await fetchSchedules();
            const filteredSchedules = data.schedules.filter((schedule) =>
                Object.values(schedule).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setScheduleDetails(filteredSchedules); // Update with the filtered schedules
            setNoResults(filteredSchedules.length === 0); // Update noResults state
        } catch (error) {
            console.error("Error searching schedules:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavandSidebar />
            <br />
            <br />
            <div className="container mx-auto p-5">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Schedule Details Display Page</h1>
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    name="search"
                    placeholder="Search user schedules"
                    className="border p-2 mb-4"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                >
                    Search
                </button>

                {noResults ? (
                    <div>
                        <p>No Schedule Found</p>
                    </div>
                ) : (
                    <div className="mt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleAddSchedule}
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-3 me-4 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Add Schedule
                            </button>
                        </div>
                        <div ref={ComponentsRef}>
                            {schedules.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto bg-white border border-gray-200 shadow-lg rounded-lg">
                                        <thead className="bg-gray-300">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Schedule ID</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Module Name</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Module ID</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Email</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Schedule Type</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Date</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Start Time</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">End Time</th>
                                                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedules.map((schedule) => (
                                                <tr key={schedule._id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2">{schedule.scheduleId}</td>
                                                    <td className="px-4 py-2">{schedule.moduleName}</td>
                                                    <td className="px-4 py-2">{schedule.moduleId}</td>
                                                    <td className="px-4 py-2">{schedule.gmail}</td>
                                                    <td className="px-4 py-2">{schedule.scheduleType}</td>
                                                    <td className="px-4 py-2">{formatDate(schedule.scheduleDate)}</td>
                                                    <td className="px-4 py-2">{formatTime(schedule.startTime)}</td>
                                                    <td className="px-4 py-2">{formatTime(schedule.endTime)}</td>
                                                    <td className="px-4 py-2">
                                                        <Link
                                                            to={`/updateschedule/${schedule._id}`}
                                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(schedule._id)}
                                                            aria-label="Delete schedule"
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No schedules found.</p>
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={handlePrint}
                    className="mt-5 p-3 bg-green-500 text-white rounded-lg cursor-pointer"
                >
                    Generate Report
                </button>
            </div>
        </div>
    );
}

export default ScheduleDetails;
