import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminSidebar from "./pages/AdminPanel/AdminSidebar";
import AdminLogin from "./pages/AdminPanel/AdminLogin";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import AdminUsers from "./pages/UserDetails/AdminUsers";
import AdminEditUser from "./pages/UserDetails/AdminEditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <Route path="/adminsidebar" element={<AdminSidebar />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


