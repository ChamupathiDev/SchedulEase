// frontend/src/pages/MoodView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Footer from '../components/Footer';

const socket = io("http://localhost:3000"); // adjust if needed

const MoodView = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [moodText, setMoodText] = useState("");
  const [customSuggestion, setCustomSuggestion] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [proposedSchedules, setProposedSchedules] = useState([]);
  const [notification, setNotification] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Join a room (using user email) for receiving schedule update notifications.
  useEffect(() => {
    if (currentUser && currentUser.email) {
      socket.emit("join", currentUser.email);
    }

    socket.on("scheduleUpdated", (data) => {
      setNotification(data.message);
      setSuggestion(data.suggestion);
    });

    return () => socket.off("scheduleUpdated");
  }, [currentUser]);

  // Step 1: Analyze mood and get proposed changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        moodText,
        userSuggestion: customSuggestion ? customSuggestion : undefined,
        confirmUpdate: false // First step: get suggestion/proposals only
      };

      const res = await axios.post("/api/moods/analyze", payload, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      // Save the suggestion and proposed schedule changes
      setSuggestion(res.data.suggestion);
      if (res.data.proposedSchedules && res.data.proposedSchedules.length > 0) {
        setProposedSchedules(res.data.proposedSchedules);
        setShowConfirm(true); // Only show confirmation if there are proposed changes
      } else {
        setNotification("No flex schedules available for update at this time.");
        setShowConfirm(false);
      }
    } catch (err) {
      console.error("Error submitting mood:", err.response?.data || err.message);
      setNotification("Error updating schedule based on mood.");
    }
  };

  // Step 2: Confirm and update schedule
  const handleConfirm = async () => {
    try {
      const payload = {
        moodText,
        confirmUpdate: true // Confirm the update
      };

      const res = await axios.post("/api/moods/analyze", payload, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setSuggestion("");
      setShowConfirm(false);
      setNotification("Your schedule has been updated based on your mood.");
      // Optionally, redirect or refresh schedule page
    } catch (err) {
      console.error("Error confirming update:", err.response?.data || err.message);
      setNotification("Error updating schedule based on mood.");
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setNotification("Schedule update cancelled.");
  };

  return (
    <div>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
        style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/gray-painted-background_53876-94041.jpg")' }}
      >
        <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Input Your Mood</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="moodText" className="block text-gray-700 mb-2">
                How are you feeling?
              </label>
              <textarea
                id="moodText"
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>
           
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Mood
            </button>
          </form>
          {suggestion && (
            <div className="mt-4 p-4 bg-green-100 rounded">
              <p className="text-green-700 font-semibold">System Suggestion:</p>
              <p className="text-green-700">{suggestion}</p>
            </div>
          )}
          {showConfirm && (
            <div className="mt-4 p-4 bg-yellow-100 rounded">
              <p className="text-yellow-800">
                The following schedule changes are proposed:
              </p>
              <ul className="mt-2">
                {proposedSchedules.map((item) => (
                  <li key={item._id} className="text-sm text-gray-700">
                    {item.moduleName}: {new Date(item.oldStartTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - {new Date(item.oldEndTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} will change to {new Date(item.proposedStartTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - {new Date(item.proposedEndTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleConfirm}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Yes, update schedule
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
         
          {notification && (
            <div className="mt-4 p-4 bg-blue-100 rounded">
              <p className="text-blue-700">{notification}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoodView;

