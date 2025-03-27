// frontend/src/pages/StudentViewSchedule.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import {
  signInSuccess,
  viewScheduleFailure,
  viewScheduleStart,
  viewScheduleSuccess,
} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const StudentViewSchedules = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
  const formatTime = (timeStr) =>
    new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        dispatch(viewScheduleStart());
        const res = await axios.get(`/api/schedules/view/${currentUser.email}`);
        setSchedules(res.data.schedules);
        dispatch(viewScheduleSuccess(res.data.schedules));
        dispatch(signInSuccess(currentUser));
        setLoading(false);
      } catch (err) {
        console.error('Fetch schedule error:', err.response ? err.response.data : err.message);
        const errorMsg = err.response?.data?.message || err.message;
        setError(errorMsg);
        dispatch(viewScheduleFailure(errorMsg));
        setLoading(false);
      }
    };

    if (currentUser && currentUser.email) {
      fetchSchedules();
    }
  }, [currentUser, dispatch]);

  // Use today's date for header display.
  const todayDate = new Date();
  const formattedToday = todayDate.toLocaleDateString();

  // Filter schedules for today using local date comparison.
  const todaysSchedules = schedules.filter((schedule) => {
    const scheduleLocalDate = new Date(schedule.scheduleDate).toLocaleDateString();
    return scheduleLocalDate === formattedToday;
  });

  // Define a threshold (in milliseconds) for considering an update "recent"
  // For example, here we use 5 minutes.
  const highlightThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds
  const now = new Date();

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg")' }}
    >
      <main className="flex-grow max-w-full mx-auto p-6 bg-white bg-opacity-70 rounded-lg shadow-md mt-4 mb-4">
        {/* Daily Schedule Card */}
        <div className="w-full flex justify-center mb-6">
          <div className="px-6 py-3 bg-blue-600 text-white text-2xl font-bold rounded-md shadow-md">
            Daily Schedule
          </div>
        </div>
        {/* Input Mood Button Positioned Above the Table */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/input-mood")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Input Mood
          </button>
        </div>
        {/* Table Container */}
        <div className="overflow-x-auto w-full">
          {loading ? (
            <p className="text-center text-gray-500">Loading schedules...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : todaysSchedules.length > 0 ? (
            <table className="min-w-full border border-gray-400 border-collapse">
              <thead>
                {/* Date header spanning all columns */}
                <tr className="bg-blue-600 text-white">
                  <th colSpan={5} className="py-3 px-4 border border-gray-400 text-center">
                    {formattedToday}
                  </th>
                </tr>
                {/* Second header row: Time merged cell and other headers */}
                <tr className="bg-blue-200 text-center">
                  <th colSpan={2} className="py-2 px-4 border border-gray-400">Time</th>
                  <th rowSpan={2} className="py-3 px-4 border border-gray-400">Module ID</th>
                  <th rowSpan={2} className="py-3 px-4 border border-gray-400">Module Name</th>
                  <th rowSpan={2} className="py-3 px-4 border border-gray-400">Lecturer Name</th>
                  <th rowSpan={2} className="py-3 px-4 border border-gray-400">Delivery Mode</th>
                  <th rowSpan={2} className="py-3 px-4 border border-gray-400">Schedule Type</th>
                </tr>
                {/* Third header row: Sub-columns for Time */}
                <tr className="bg-blue-200 text-left">
                  <th className="py-2 px-4 border border-gray-400">Start Time</th>
                  <th className="py-2 px-4 border border-gray-400">End Time</th>
                </tr>
              </thead>
              <tbody>
                {todaysSchedules.map((schedule) => {
                  // Check if updatedByMood is true and updatedAt is within the highlight threshold.
                  const isRecentlyUpdated =
                    schedule.updatedByMood &&
                    schedule.updatedAt &&
                    now - new Date(schedule.updatedAt) < highlightThreshold;
                  // Apply green highlight and bold font if recently updated.
                  const rowClass = isRecentlyUpdated ? "bg-green-300 font-bold" : "hover:bg-gray-100";
                  return (
                    <tr key={schedule._id} className={rowClass}>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {formatTime(schedule.startTime)}
                      </td>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {formatTime(schedule.endTime)}
                      </td>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {schedule.moduleId}
                      </td>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {schedule.moduleName}
                      </td>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {schedule.Lecturer}
                      </td>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {schedule.DeliveryMode}
                      </td>
                      <td className="py-4 px-6 border border-gray-400 text-gray-700">
                        {schedule.scheduleType}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center mt-6">No schedules for today.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentViewSchedules;
