import React from 'react'
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-Poppins">
      

      {/* Hero Section */}
      <header className="bg-gray-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Smart Schedule Management & Mood-Based Adjustments</h1>
        <p className="mt-4 text-lg">A dynamic platform that optimizes your study schedule and adjusts it based on your mood for a balanced academic experience.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 cursor-pointer">
          Get Started
        </button>
      </header>


      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Schedule Management Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">⏳ Schedule Management</h2>
            <p className="text-gray-600">
              Effortlessly plan, track, and optimize your study sessions. Stay on top of assignments, exams, and deadlines with a customizable study schedule.
            </p>
            
          </div>

          {/* Mood-Based Schedule Adjustment Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🌙 Mood-Based Schedule Adjustment</h2>
            <p className="text-gray-600">
              Leverage AI to automatically adjust your study schedule based on your mood, energy levels, and focus to maximize productivity and well-being.
            </p>
           
          </div>
        </div>
      </section>

      {/* About Students Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">About Our Students</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform helps students manage their study time efficiently and adapt their schedule based on their mood, ensuring a healthy study-life balance.
          </p>

          {/* Student Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Personalized Study Schedules */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Personalized Study Schedules</h3>
              <p className="mt-4 text-gray-600">
                Customize your study schedule according to your individual goals, preferences, and availability. Optimize time management for greater success.
              </p>
            </div>

            {/* Mood-based Adjustment */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600">Automated Mood-based Adjustments</h3>
              <p className="mt-4 text-gray-600">
                Let the platform assess your mood and automatically adjust your study plan for maximum focus and productivity based on your current state.
              </p>
            </div>

            {/* Efficient Task Management */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-600">Efficient Task Management</h3>
              <p className="mt-4 text-gray-600">
                Manage tasks effectively by setting reminders, tracking deadlines, and adjusting study durations based on real-time performance and mood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Lecturers Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">About Our Lecturers</h2>
          <p className="mt-4 text-lg text-gray-600">
            Lecturers can monitor students' progress in real-time, offering them personalized insights and suggestions based on mood-driven schedule adjustments.
          </p>

          {/* Lecturer Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Performance Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Performance Tracking</h3>
              <p className="mt-4 text-gray-600">
                Track student engagement and productivity levels through integrated analytics that account for both academic progress and mood-driven adjustments.
              </p>
            </div>

            {/* Adaptive Feedback */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600">Adaptive Feedback</h3>
              <p className="mt-4 text-gray-600">
                Provide feedback based on student mood and engagement levels to help them stay motivated and improve learning outcomes.
              </p>
            </div>

            {/* Interaction Insights */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-600">Student Interaction Insights</h3>
              <p className="mt-4 text-gray-600">
                Understand how mood affects learning and tailor interactions to ensure each student receives personalized attention when they need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
