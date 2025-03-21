import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import StudentViewSchedules from "./pages/StudentViewSchedule";
import Course from "./pages/Course";

export default function App() {
  return (
    <BrowserRouter>
    {/* header */}
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
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
