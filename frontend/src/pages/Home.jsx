import React from 'react'
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Empower Your Learning & Time Management</h1>
        <p className="mt-4 text-lg">A smart platform to manage courses and schedule your study time efficiently.</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 cursor-pointer">
          Get Started
        </button>
      </header>
      

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Learning Management Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📚 Learning Management</h2>
            <p className="text-gray-600">
              Organize courses, track progress, and engage with interactive content. Stay ahead in your studies with ease.
            </p>
            
          </div>

          {/* Time Scheduling Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">⏳ Smart Time Scheduling</h2>
            <p className="text-gray-600">
              Plan study sessions, set reminders, and adjust breaks dynamically with AI-driven insights.
            </p>
           
          </div>
        </div>
      </section>

      {/* About Students Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">About Our Students</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform is designed to empower students in their academic journey. With powerful tools for learning management and
            intelligent scheduling, students can easily manage their courses, stay organized, and improve productivity.
          </p>

          {/* Student Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Student Profile 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Student Profiles</h3>
              <p className="mt-4 text-gray-600">
                Create personalized student profiles with your courses, progress, and achievements. Keep track of your academic
                milestones and stay motivated.
              </p>
            </div>

            {/* Student Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600">Track Progress</h3>
              <p className="mt-4 text-gray-600">
                Monitor your academic progress through visual dashboards and reports. Get insights into your performance and stay
                on track for success.
              </p>
            </div>

            {/* Student Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-600">Collaborative Learning</h3>
              <p className="mt-4 text-gray-600">
                Collaborate with peers, engage in group discussions, and share resources. Learning is better when done together!
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
            Our platform is equally beneficial for lecturers, enabling them to manage courses, track student progress, and interact with their students seamlessly.
          </p>

          {/* Lecturer Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Lecturer Profile Management */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">Course & Profile Management</h3>
              <p className="mt-4 text-gray-600">
                Create and manage courses, upload materials, and track student engagement. Keep track of your lecture schedules and
                the progress of your students.
              </p>
            </div>

            {/* Lecturer Student Interaction */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600">Student Interaction</h3>
              <p className="mt-4 text-gray-600">
                Engage with students through discussion boards, quizzes, and feedback. Build a strong relationship with your students
                and enhance learning outcomes.
              </p>
            </div>

            {/* Lecturer Performance Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-red-600">Performance Analytics</h3>
              <p className="mt-4 text-gray-600">
                Monitor student performance, track their progress, and identify areas for improvement. Leverage data-driven insights to
                enhance teaching strategies.
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
