
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import StudentViewSchedules from "./pages/StudentViewSchedule";
import ScheduleDetails from "./pages/ScheduleDetails/ScheduleDetails";
import AddSchedule from "./pages/AddSchedule/AddSchedule";
import UpdateSchedule from "./pages/UpdateSchedule/UpdateSchedule";
import AdminSidebar from "./pages/AdminPanel/AdminSidebar";
import AdminLogin from "./pages/AdminPanel/AdminLogin";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import MoodView from "./pages/MoodView";
import AdminUsers from "./pages/UserDetails/AdminUsers";
import AdminEditUser from "./pages/UserDetails/AdminEditUser";
import AddCourseModule from "./pages/AddCourseModule";
import CourseModuleHome from "./pages/CourseModuleHome";
import CourseTable from "./pages/CourseTable";
import UpdateCourse from "./pages/UpdateCourse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScheduleBarChart from "./pages/Charts/ScheduleBarChart";


export default function App() {
  return (
    <BrowserRouter>
    
    <ToastContainer />
      {/* header */}
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/userdetails" element={<AdminUsers />} />
        <Route path="/updateuser/:id" element={<AdminEditUser />} />
        <Route path="/scheduledetails" element={<ScheduleDetails />} />
        <Route path="/addschedule" element={<AddSchedule />} />
        <Route path="/updateschedule/:id" element={<UpdateSchedule />} />
        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/input-mood" element={<MoodView />} />
        <Route path="/CMhome" element={<CourseModuleHome />} />
        <Route path="/addcoursemodule" element={<AddCourseModule />} />
        <Route path="/courseTable" element={<CourseTable />} />
        <Route path="/updatecoursemodule/:id" element={<UpdateCourse />} />
        <Route path="/schedule-chart" element={<ScheduleBarChart/>} />

        <Route element={<PrivateRoute />}>
          <Route path="/schedule" element={<StudentViewSchedules />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


