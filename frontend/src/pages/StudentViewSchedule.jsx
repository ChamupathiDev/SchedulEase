import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer.jsx';
import { viewScheduleFailure, viewScheduleStart, viewScheduleSuccess } from '../redux/user/userSlice.js';

const StudentViewSchedules = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser._id && currentUser.email) {
      const fetchSchedules = async () => {
        try {
          dispatch(viewScheduleStart());
          // Call the endpoint using the currentUser's _id (as required by backend)
          const response = await axios.get(`http://localhost:3000/api/schedules/view/${currentUser._id}`);
          
          // The backend returns a single schedule document (or null)
          // Normalize the response to always be an array:
          let scheduleData = response.data.schedules;
          if (!Array.isArray(scheduleData)) {
            scheduleData = scheduleData ? [scheduleData] : [];
          }
          
          // Filter schedules by today's date (YYYY-MM-DD)
          const today = new Date().toISOString().split('T')[0];
          const filteredSchedules = scheduleData.filter((schedule) => {
            const scheduleDate = new Date(schedule.scheduleDate).toISOString().split('T')[0];
            return scheduleDate === today;
          });
          
          setSchedules(filteredSchedules);
          dispatch(viewScheduleSuccess());
        } catch (err) {
          setError('Error fetching schedules.');
          dispatch(viewScheduleFailure());
        } finally {
          setLoading(false);
        }
      };

      fetchSchedules();
    } else {
      setLoading(false);
      dispatch(viewScheduleFailure());
    }
  }, [currentUser, dispatch]);

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleDateString();
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          My Schedule Details
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading schedules...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : schedules.length > 0 ? (
          <div className="space-y-6">
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {schedule.moduleName}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {schedule.scheduleType}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Module ID:</span>
                    <span className="text-gray-600">{schedule.moduleId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="text-gray-600">
                      {formatDate(schedule.scheduleDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Start Time:
                    </span>
                    <span className="text-gray-600">
                      {formatTime(schedule.startTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">End Time:</span>
                    <span className="text-gray-600">
                      {formatTime(schedule.endTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No schedules for today.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StudentViewSchedules;
