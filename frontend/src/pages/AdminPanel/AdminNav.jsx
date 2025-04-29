import React, { useState } from 'react';
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const AdminNav = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className='bg-gray-900 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
      <div className='flex items-center text-xl'>
        <button onClick={toggleSidebar} className='text-gray-300 hover:text-white me-4'>
          <FaBars />
        </button>
        <span className='text-white font-semibold'>Admin Panel</span>
      </div>
      <div className='flex items-center gap-x-5'>
        {/* Search Bar */}
        <div className='relative w-64 hidden md:block'>
          <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
            <FaSearch />
          </span>
          <input
            type="text"
            className='w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder="Search..."
          />
        </div>
        {/* Bell Icon */}
        <button className='text-gray-300 hover:text-white'>
          <FaBell className='w-6 h-6' />
        </button>
        {/* User Dropdown */}
        <div className='relative'>
          <button onClick={() => setShowDropdown(!showDropdown)} className='text-gray-300 hover:text-white focus:outline-none'>
            <FaUserCircle className='w-6 h-6' />
          </button>
          {showDropdown && (
            <div className='absolute right-0 mt-2 bg-white rounded shadow-lg w-32'>
              <ul className='py-2 text-gray-700 text-sm'>
                <li className='px-4 py-2 hover:bg-gray-200'><a href="#">Profile</a></li>
                <li className='px-4 py-2 hover:bg-gray-200'><a href="#">Settings</a></li>
                <li className='px-4 py-2 hover:bg-gray-200'><a href="/">Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
