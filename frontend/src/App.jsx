// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import AddCourseModule from "./components/AddCourseModule";
import CourseModuleHome from "./components/CourseModuleHome";
import CourseTable from "./components/CourseTable";
import UpdateCourse from "./components/UpdateCourse";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CourseModuleHome />} />
        <Route path="/addcoursemodule" element={<AddCourseModule />} />
        <Route path="/courseTable" element={<CourseTable />} />
        <Route path="/updatecoursemodule/:id" element={<UpdateCourse />} />
      </Routes>
      {/* ToastContainer is outside Routes */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;


