import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';
import { FiUsers, FiCalendar, FiBook } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const URL = "http://localhost:5000/schedules";

const fetchSchedules = async () => {
    return await axios.get(URL).then((res) => res.data);
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSchedules, setTotalSchedules] = useState(0);

  // Fetch schedules and total schedules count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSchedules();
        setSchedules(data.schedules);
        setTotalSchedules(data.schedules.length);  // Set total schedules count
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateChartDataByTotalHours = () => {
    const moduleHours = schedules.reduce((acc, schedule) => {
      const startTime = new Date(schedule.startTime);
      const endTime = new Date(schedule.endTime);
      const duration = (endTime - startTime) / (1000 * 60 * 60); // Calculate duration in hours
      acc[schedule.moduleName] = (acc[schedule.moduleName] || 0) + duration;
      return acc;
    }, {});
    return {
      labels: Object.keys(moduleHours),
      datasets: [
        {
          label: 'Total Lecture Hours',
          data: Object.values(moduleHours),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderRadius: 0,
          barThickness: 110,
        },
      ],
    };
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='flex'>
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <AdminNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-8 mt-20">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <FiUsers className="text-4xl" />
              <div>
                <p className="text-lg font-semibold">Total Users</p>
                <p className="text-2xl font-bold">1,200</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <FiCalendar className="text-4xl" />
              <div>
                <p className="text-lg font-semibold">Total Schedules</p>
                <p className="text-2xl font-bold">{totalSchedules}</p> {/*  real total schedules */}
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-xl shadow-md flex items-center gap-4">
              <FiBook className="text-4xl" />
              <div>
                <p className="text-lg font-semibold">Total Courses</p>
                <p className="text-2xl font-bold">40</p>
              </div>
            </div>
          </div>
          <div className="mt-10 p-6 bg-white rounded-xl shadow-md" style={{ height: '600px', width: '100%' }}>
            <h2 className="text-2xl font-bold mb-4">Total Lecture Hours by Subject</h2>
            <div style={{ height: '500px', width: '100%' }}>
              <Bar data={generateChartDataByTotalHours()} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
