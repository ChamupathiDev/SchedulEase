import React from 'react';
import Footer from '../components/Footer';

export default function Course() {
  const modules = [
    { id: 'IT101', name: 'Introduction to Programming' },
    { id: 'IT102', name: 'Computer Network' },
    { id: 'IT103', name: 'Database system' },
    { id: 'IT104', name: 'Communication Skills' },
    { id: 'IT105', name: 'Professional Skills' },
  ];

  return (
    <div>
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg")' }}>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-3xl">
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
          Course: Information Technology
        </div>
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left">Module ID</th>
              <th className="py-3 px-6 text-left">Module Name</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, index) => (
              <tr key={module.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-6">{module.id}</td>
                <td className="py-3 px-6">{module.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <Footer />
    </div>
  );
}
