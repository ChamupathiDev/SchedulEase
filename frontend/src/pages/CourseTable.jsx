// src/components/CourseTable.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSearch, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import AdminNavandSidebar from "./AdminPanel/AdminNavAndSidebar";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function CourseTable() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseIds, setCourseIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/courses");
    
                console.log("API Response:", response.data); // Debug log
    
                const allCourses = response.data.allCourses;
    
                if (Array.isArray(allCourses)) {
                    setCourses(allCourses);
                    const ids = allCourses.map((course) => course.moduleID);
                    setCourseIds(ids);
                } else {
                    console.warn("Expected 'allCourses' to be an array but got:", allCourses);
                    setCourses([]);
                }
            } catch (error) {
                console.error("Error fetching courses:", error?.response?.data || error?.message || error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    useEffect(() => {
        const results = courses.filter(course =>
            course.moduleID.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(results);
    }, [searchTerm, courses]);

   
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course module?");
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:3000/api/courses/${id}`);
            setCourses(courses.filter((course) => course._id !== id));
            toast.success("✅ Module is deleted successfully!");
        } catch (error) {
            console.error("Error deleting course:", error.response?.data || error.message);
            toast.error("❌ Failed to delete module. Please try again.");
        }
    };
    

    const handleAddCourse = () => {
        navigate("/addcoursemodule", { state: { courseIds } });
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
    
        // Add title
        doc.setFontSize(18);
        doc.text("Course Modules Report", 14, 22);
    
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
        const tableData = filteredCourses.map(course => [
            course.moduleName,
            course.moduleID,
            course.licName,
            course.licEmail,
            course.moduleCredit
        ]);
    
        // Use autoTable without fixed widths to auto-fit the page
        autoTable(doc, {
            head: [['Module Name', 'Module ID', 'Lecturer', 'Email', 'Credits']],
            body: tableData,
            startY: 40,
            styles: {
                fontSize: 9,
                cellPadding: 2,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            // Remove fixed column widths and let it auto-resize
            
        });
    
        doc.save(`courses_report_${new Date().toISOString().slice(0,10)}.pdf`);
    };
    
    

    return (
      
        <div className="min-h-screen bg-gradient-to-r from-slate-300 to-gray-100">
         <div className="fixed top-0 left-0 z-50">
                <AdminNavandSidebar />
               </div>
            <div className="container mx-auto p-5 ">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Course Modules Display</h1>
                <div className="mt-5">
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by Module ID..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full  bg-white focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={generatePDFReport}
                                className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
                            >
                                <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                                Generate PDF
                            </button>
                            <button
                                type="button"
                                onClick={handleAddCourse}
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-2"
                            >
                                Add Course Module
                            </button>
                        </div>
                    </div>
                    {filteredCourses.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto bg-white border border-gray-200 shadow-lg rounded-lg">
                                <thead className="bg-gray-300">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Module Name</th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Module ID</th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Lecturer</th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Email</th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Credits</th>
                                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCourses.map((course) => (
                                        <tr key={course._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2">{course.moduleName}</td>
                                            <td className="px-4 py-2">{course.moduleID}</td>
                                            <td className="px-4 py-2">{course.licName}</td>
                                            <td className="px-4 py-2">{course.licEmail}</td>
                                            <td className="px-4 py-2">{course.moduleCredit}</td>
                                            <td className="px-4 py-2">
                                                <Link
                                                    to={`/updatecoursemodule/${course._id}`}
                                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(course._id)}
                                                    aria-label="Delete course"
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                {searchTerm ? "No matching courses found" : "No course modules found"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            </div>
    );
}

export default CourseTable;