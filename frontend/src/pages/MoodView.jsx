// frontend/src/pages/MoodView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io("http://localhost:3000"); // adjust if needed

const MoodView = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [moodText, setMoodText] = useState("");
  const [customSuggestion, setCustomSuggestion] = useState("");
  const [systemSuggestion, setSystemSuggestion] = useState("");
  const [notification, setNotification] = useState("");

  // Join a room (using user email) for receiving schedule update notifications.
  useEffect(() => {
    if (currentUser && currentUser.email) {
      socket.emit("join", currentUser.email);
    }

    socket.on("scheduleUpdated", (data) => {
      setNotification(data.message);
      setSystemSuggestion(data.suggestion);
    });

    return () => socket.off("scheduleUpdated");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        moodText,
        userSuggestion: customSuggestion ? customSuggestion : undefined,
      };

      const res = await axios.post("/api/moods/analyze", payload, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      // In case the backend returns the suggestion immediately
      setSystemSuggestion(res.data.suggestion);
      setNotification("Your schedule has been updated based on your mood.");
    } catch (err) {
      console.error("Error submitting mood:", err.response?.data || err.message);
      setNotification("Error updating schedule based on mood.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              (Optional) Enter your own suggestion for schedule adjustment:
            </label>
            <input
              type="text"
              value={customSuggestion}
              onChange={(e) => setCustomSuggestion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your suggestion..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Mood
          </button>
        </form>
        {systemSuggestion && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-green-700 font-semibold">System Suggestion:</p>
            <p className="text-green-700">{systemSuggestion}</p>
          </div>
        )}
        {notification && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-blue-700">{notification}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodView;
