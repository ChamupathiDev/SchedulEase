import React from 'react';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div>
    <div className="bg-gray-100 min-h-screen p-8" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg")' }}>
      {/* Contact Us Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-8">Have questions about managing timetables or facing issues? Reach out to us!</p>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Institution/Organization</label>
            <input
              type="text"
              placeholder="Your institution or organization"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="yourname@example.com"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Message</label>
            <textarea
              rows="5"
              placeholder="Describe your query or issue related to scheduling"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 w-full">
            Submit Query
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="border border-gray-200 rounded-xl p-4">
            <summary className="cursor-pointer text-lg font-medium text-gray-700">What is Schedulease?</summary>
            <p className="mt-2 text-gray-600">
              Schedulease is a conflict-free timetable management platform designed to simplify scheduling for institutions, teachers, and students.
            </p>
          </details>
          <details className="border border-gray-200 rounded-xl p-4">
            <summary className="cursor-pointer text-lg font-medium text-gray-700">Can I integrate Schedulease with my institution's system?</summary>
            <p className="mt-2 text-gray-600">
              Yes, Schedulease supports integration with most institutional management systems. Contact us for customized integration options.
            </p>
          </details>
          <details className="border border-gray-200 rounded-xl p-4">
            <summary className="cursor-pointer text-lg font-medium text-gray-700">Is there a limit to the number of timetables I can create?</summary>
            <p className="mt-2 text-gray-600">
              No, you can create and manage unlimited timetables across multiple departments and user roles.
            </p>
          </details>
          <details className="border border-gray-200 rounded-xl p-4">
            <summary className="cursor-pointer text-lg font-medium text-gray-700">How do you handle scheduling conflicts?</summary>
            <p className="mt-2 text-gray-600">
              Schedulease uses smart algorithms to automatically detect and resolve conflicts, ensuring no overlapping classes or double bookings.
            </p>
          </details>
          <details className="border border-gray-200 rounded-xl p-4">
            <summary className="cursor-pointer text-lg font-medium text-gray-700">How can I get technical support?</summary>
            <p className="mt-2 text-gray-600">
              Use the contact form above or email us at support@schedulease.com. Our support team is available 24/7 to assist you.
            </p>
          </details>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
