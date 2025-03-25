import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import StudentViewSchedules from "./pages/StudentViewSchedule";
import Course from "./pages/Course";
import ScheduleDetails from "./pages/ScheduleDetails/ScheduleDetails";
import AddSchedule from "./pages/AddSchedule/AddSchedule";
import UpdateSchedule from "./pages/UpdateSchedule/UpdateSchedule";
import AdminSidebar from "./pages/AdminPanel/AdminSidebar";
import AdminLogin from "./pages/AdminPanel/AdminLogin";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import ModuleHome from "./pages/ModuleHome";
import ModuleForm from "./pages/ModuleForm";
import ModuleListPage from "./pages/ModuleListPage";
import EditModules from "./pages/EditModules";
import MoodView from "./pages/MoodView";


export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/scheduledetails" element={<ScheduleDetails />} />
        <Route path="/addschedule" element={<AddSchedule />} />
        <Route path="/updateschedule/:id" element={<UpdateSchedule />} />
        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/module-home" element={<ModuleHome />} /> {/* Set ModuleHome as the default page */}
        <Route path="/add-module" element={<ModuleForm />} />
        <Route path="/modules" element={<ModuleListPage />} />
        <Route path="/edit-module/:id" element={<EditModules />} />
        <Route path="/input-mood" element={<MoodView />} />

        <Route element={<PrivateRoute />}>
          <Route path="/schedule" element={<StudentViewSchedules />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/course" element={<Course />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


