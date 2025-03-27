import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="bg-black text-white font-Poppins">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
          <FaRegCalendarAlt className="text-xl text-blue-600 gap-2" /> 
          <h1 className="font-bold">SchedulEase</h1>
        </Link>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/schedule">
            {currentUser ? (
              <li>MySchedule</li>
            ):(
            <li></li>
          )}
          </Link>
          
          <Link to="/contact">
            <li>Contact us</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.profilePicture}  alt="profile"
              className="h-7 w-7 rounded-full object-cover" />
            ):(
            <li>Sign In</li>
          )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
