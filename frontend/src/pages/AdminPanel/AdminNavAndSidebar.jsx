import React, { useState } from 'react';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='flex'>
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <AdminNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
    </div>
  );
};

export default AdminDashboard;
