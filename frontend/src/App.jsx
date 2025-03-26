

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddUser from "./components/AddUser/AddUser";
import Users from "./components/UserDetails/Users";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import StudentViewSchedule from "./components/StudentViewSchedule/StudentViewSchedule";
import ScheduleDetails from "./components/ScheduleDetails/ScheduleDetails"; // Make sure this path is correct
import AddSchedule from "./components/AddSchedule/AddSchedule";
import UpdateSchedule from "./components/UpdateSchedule/UpdateSchedule";
import AdminPanel from "./components/AdminPanel/adminPanel";
import AdminNav from "./components/AdminPanel/AdminNav";
import AdminSidebar from "./components/AdminPanel/AdminSidebar";
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import AdminLogin from "./components/AdminPanel/AdminLogin";





function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Login page should come before the Protected Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<Users />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
          <Route path="/viewstudentschedule" element={<StudentViewSchedule />} />
          <Route path="/scheduledetails" element={<ScheduleDetails />} />
          <Route path="/addschedule" element={<AddSchedule />} />
          <Route path="/updateschedule/:id" element={<UpdateSchedule />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/adminsidebar" element={<AdminSidebar />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
