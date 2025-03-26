import React, { useState } from 'react';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';
import { FiUsers, FiCalendar, FiBook } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const barData = {
    labels: ['Skills', 'Network advance', 'Introduction C#', 'Engineering Mathematics', 'Python basics'],
    datasets: [
      {
        label: 'Total Lecture Hours',
        data: [50, 40, 35, 45, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderRadius: 1,
      },
    ],
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
                <p className="text-2xl font-bold">150</p>
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
          <div className="mt-10 p-6 bg-white rounded-xl shadow-md" style={{ height: '600px', width:'950px' }}>
            <h2 className="text-2xl font-bold mb-4">Total Lecture Hours by Subject</h2>
            <div style={{ height: '500px',width:'900px'}}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;