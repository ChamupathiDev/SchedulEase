import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaListAlt, FaTrash, FaEdit } from "react-icons/fa";

const CourseModuleHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-300 to-slate-500">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-indigo-600">SchedulEase</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Course Module Dashboard</h2>
          <p className="text-xl text-gray-600">Manage all your academic courses in one place</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Course Card */}
          <div 
            onClick={() => navigate('/AddCourseModule')}
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-xl border border-white/20"
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              <div className="bg-indigo-100/80 p-5 rounded-full mb-6 ring-4 ring-indigo-50">
                <FaPlusCircle className="text-indigo-600 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Add New Course</h3>
              <p className="text-gray-600 mb-6">
                Create and register new course modules for your academic programs
              </p>
              <div className="mt-auto w-full">
                <div className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all inline-block">
                  Get Started
                </div>
              </div>
            </div>
          </div>

          {/* View Courses Card */}
          <div 
            onClick={() => navigate('/CourseTable')}
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-xl border border-white/20"
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              <div className="bg-green-100/80 p-5 rounded-full mb-6 ring-4 ring-green-50">
                <FaListAlt className="text-green-600 text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Manage Courses</h3>
              <p className="text-gray-600 mb-6">
                View, edit, and manage all existing course modules in your system
              </p>
              <div className="mt-auto w-full">
                <div className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all inline-block">
                  View All
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-md border border-white/20">
            <h4 className="text-lg font-medium text-gray-500">Total Courses</h4>
            <p className="text-3xl font-bold text-indigo-600">24</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-md border border-white/20">
            <h4 className="text-lg font-medium text-gray-500">Active This Semester</h4>
            <p className="text-3xl font-bold text-green-600">18</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-md border border-white/20">
            <h4 className="text-lg font-medium text-gray-500">Lecturers</h4>
            <p className="text-3xl font-bold text-blue-600">15</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Course Management System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CourseModuleHome;