import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaUser, FaCalendarAlt, FaBook, FaCog, FaTimes, 
  FaChartBar, FaTable, FaFileAlt, FaUsers, FaUserPlus, 
  FaBookOpen, FaChalkboardTeacher 
} from 'react-icons/fa';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  return (
    <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
      <div className='px-4 py-4 flex justify-between items-center text-white'>
        <h2 className='text-2xl font-bold'>Admin Dashboard</h2>
        <button onClick={toggleSidebar} className='md:hidden text-gray-300 hover:text-white'>
          <FaTimes />
        </button>
      </div>
      <hr className='border-gray-700' />
      
      <ul className='mt-3 font-bold text-blue-400'>
        {/* Home */}
        <li className='mb-2 py-2 px-3 flex items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded'>
          <Link to="/admindashboard" className="flex items-center w-full">
            <FaHome className='w-6 h-6 mr-2' />Home
          </Link>
        </li>

        {/* User Management */}
        <li 
          className='mb-2 py-2 px-3 flex items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded' 
          onClick={() => setIsUserOpen(!isUserOpen)}
        >
          <FaUser className='w-6 h-6 mr-2' /> 
          <span>User Management</span>
        </li>
        {isUserOpen && (
          <ul className="ml-8 text-blue-300">
            
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/users/add" className="flex items-center">
                <FaChartBar className='w-5 h-5 mr-2' /> Charts
              </Link>
            </li>
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/userdetails" className="flex items-center">
                <FaTable className='w-5 h-5 mr-2' /> Tables
              </Link>
            </li>
          </ul>
        )}

        {/* Schedule Management */}
        <li 
          className='mb-2 py-2 px-3 flex items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded' 
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
        >
          <FaCalendarAlt className='w-6 h-6 mr-2' /> 
          <span>Schedule Management</span>
        </li>
        {isScheduleOpen && (
          <ul className="ml-8 text-blue-300">
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/schedule/reports" className="flex items-center">
                <FaFileAlt className='w-5 h-5 mr-2' /> Reports
              </Link>
            </li>
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/schedule/charts" className="flex items-center">
                <FaChartBar className='w-5 h-5 mr-2' /> Charts
              </Link>
            </li>
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/scheduledetails" className="flex items-center">
                <FaTable className='w-5 h-5 mr-2' /> Tables
              </Link>
            </li>
          </ul>
        )}

        {/* Course Management */}
        <li 
          className='mb-2 py-2 px-3 flex items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded' 
          onClick={() => setIsCourseOpen(!isCourseOpen)}
        >
          <FaBook className='w-6 h-6 mr-2' /> 
          <span>Course Management</span>
        </li>
        {isCourseOpen && (
          <ul className="ml-8 text-blue-300">
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/courses/list" className="flex items-center">
                <FaFileAlt className='w-5 h-5 mr-2' /> Reports
              </Link>
            </li>
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>
              <Link to="/courses/add" className="flex items-center">
                <FaChartBar className='w-5 h-5 mr-2' /> Charts
              </Link>
            </li>
            <li className='mb-2 py-2 px-3 rounded hover:bg-gray-700 hover:text-white'>

              <Link to="/CMhome" className="flex items-center">
                <FaTable className='w-5 h-5 mr-2' /> Tables
              </Link>
            </li>
          </ul>
        )}

        {/* Settings */}
        <li className='mb-2 py-2 px-3 flex items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded'>
          <Link to="/settings" className="flex items-center w-full">
            <FaCog className='w-6 h-6 mr-2' /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
