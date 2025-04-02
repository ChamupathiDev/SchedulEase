import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from "recharts";
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";

const URL = "http://localhost:5000/schedules";

const fetchSchedules = async () => {
    return await axios.get(URL).then((res) => res.data);
};


function ScheduleBarChart() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSchedules();
                setSchedules(data.schedules);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const generateChartDataByType = () => {
        const typeCounts = schedules.reduce((acc, schedule) => {
            acc[schedule.scheduleType] = (acc[schedule.scheduleType] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(typeCounts).map((key) => ({ scheduleType: key, count: typeCounts[key] }));
    };

    const generateChartDataByModuleName = () => {
        const moduleCounts = schedules.reduce((acc, schedule) => {
            acc[schedule.moduleName] = (acc[schedule.moduleName] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(moduleCounts).map((key) => ({ moduleName: key, count: moduleCounts[key] }));
    };

    const generateChartDataByTotalHours = () => {
        const moduleHours = schedules.reduce((acc, schedule) => {
            const startTime = new Date(schedule.startTime);
            const endTime = new Date(schedule.endTime);
            const duration = (endTime - startTime) / (1000 * 60 * 60);
            acc[schedule.moduleName] = (acc[schedule.moduleName] || 0) + duration;
            return acc;
        }, {});
        return Object.keys(moduleHours).map((key) => ({ moduleName: key, totalHours: moduleHours[key].toFixed(2) }));
    };

    const generatePieChartData = () => {
        const now = new Date(); 
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        let past = 0, todayPast = 0, todayFuture = 0, future = 0;

        schedules.forEach(schedule => {
            const startTime = new Date(schedule.startTime);
            const endTime = new Date(schedule.endTime);

            if (endTime < today) {
                past++; 
            } else if (startTime >= today && startTime < tomorrow) {
                if (endTime < now) {
                    todayPast++;
                } else {
                    todayFuture++;
                }
            } else if (startTime >= tomorrow) {
                future++;
            }
        });

        return [
            { name: "Past", value: past },
            { name: "Today-Past", value: todayPast },
            { name: "Today-Future", value: todayFuture },
            { name: "Future", value: future }
        ];
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const COLORS = ["#ff6666", "#ffcc99", "#66b3ff", "#99ff99"];

    return (
        <div className="flex">
            <AdminNavandSidebar />
            <div className="flex-grow container mx-auto p-5 mt-16">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Schedule Charts</h1>
                
                <div className="grid grid-cols-2 gap-8 items-start">
                    {/* First Pie Chart */}
                    <div className="col-span-1 flex justify-center">
                        <div className="w-full h-96">
                            <h2 className="text-2xl font-bold text-center mb-4">Schedule Type Distribution</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={generateChartDataByType()} dataKey="count" nameKey="scheduleType" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
                                        {generateChartDataByType().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
    
                    {/* Second Pie Chart */}
                    <div className="col-span-1 flex justify-center">
                        <div className="w-full h-96">
                            <h2 className="text-2xl font-bold text-center mb-4">Schedule Overview</h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={generatePieChartData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#82ca9d" label>
                                        {generatePieChartData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
    
                {/* Remaining Bar Charts */}
                
                <div className="mt-10"><br></br>
                    <h2 className="text-2xl font-bold text-center mb-4">Schedule Module Name Distribution</h2>
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={generateChartDataByModuleName()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="moduleName" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ffc658" barSize={100} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-center mb-4">Total Hours Per Subject</h2>
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={generateChartDataByTotalHours()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="moduleName" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalHours" fill="#82ca9d" barSize={100} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleBarChart;
