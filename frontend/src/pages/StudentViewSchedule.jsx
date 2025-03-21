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
import {
  CalendarIcon,
  ClockIcon,
  IdentificationIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const StudentViewSchedules = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mood, setMood] = useState('');
  const dispatch = useDispatch();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString();

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

  const today = new Date().toISOString().split('T')[0];

  const todaysSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.scheduleDate).toISOString().split('T')[0];
    return scheduleDate === today;
  });

  const handleMoodSubmit = async () => {
    try {
      console.log('Submitted mood:', mood);
      const res = await axios.post('/api/mood/submit', {
        email: currentUser.email,  // current user's email
        mood: mood
      });
      console.log('Mood submitted successfully:', res.data);
      setMood('');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting mood:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      <main className="flex-grow max-w-6xl mx-auto p-6">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Daily Schedule
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition self-end"
          >
            Input Mood
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading schedules...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : todaysSchedules.length > 0 ? (
          <div className="space-y-4">
            {todaysSchedules.map((schedule) => (
              <div
                key={schedule._id}
                className="bg-white flex flex-col md:flex-row items-center p-6 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-300 w-[600px] mx-auto"
              >
                <AcademicCapIcon className="w-12 h-12 text-blue-700 mb-4 md:mb-0 md:mr-6" />
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                    {schedule.moduleName}{' '}
                    <span className="text-sm text-gray-500 ml-2">({schedule.scheduleType})</span>
                  </h3>
                  <div className="space-y-1 text-base">
                    <p className="flex items-center">
                      <IdentificationIcon className="w-5 h-5 text-gray-700 mr-2" />
                      <span className="font-bold text-gray-700">Module ID:</span>{' '}
                      <span className="text-gray-800">{schedule.moduleId}</span>
                    </p>
                    <p className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-700 mr-2" />
                      <span className="font-bold text-gray-700">Date:</span>{' '}
                      <span className="text-gray-800">{formatDate(schedule.scheduleDate)}</span>
                    </p>
                    <p className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-gray-700 mr-2" />
                      <span className="font-bold text-gray-700">Start Time:</span>{' '}
                      <span className="text-gray-800">{formatTime(schedule.startTime)}</span>
                    </p>
                    <p className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-gray-700 mr-2" />
                      <span className="font-bold text-gray-700">End Time:</span>{' '}
                      <span className="text-gray-800">{formatTime(schedule.endTime)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No schedules for today.</p>
        )}
      </main>
      <Footer />

      {/* Mood Input Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Enter Your Mood</h2>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows="4"
              placeholder="How are you feeling?"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleMoodSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentViewSchedules;
