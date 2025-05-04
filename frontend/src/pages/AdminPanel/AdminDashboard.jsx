// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import AdminNavAndSidebar from "../AdminPanel/AdminNavAndSidebar";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [minutes, setMinutes] = useState(5);

  useEffect(() => {
    fetchRealtime(minutes);
    const interval = setInterval(() => fetchRealtime(minutes), 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [minutes]);

  const fetchRealtime = (mins) => {
    axios.get(`/api/analytics/realtime-sentiment?minutes=${mins}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching realtime sentiment:', err));
  };

  return (
    <>
      {/* Fixed nav and sidebar */}
      <AdminNavAndSidebar />

      {/* Main content shifted */}
      <div className="ml-64 mt-16 p-6">
        <h1 className="text-3xl font-bold mb-4">Real‑Time Mood Analytics</h1>

        <div className="mb-6">
          <label className="mr-2 font-medium">Last</label>
          <select
            className="border rounded px-2 py-1"
            value={minutes}
            onChange={e => setMinutes(parseInt(e.target.value, 10))}
          >
            {[1, 5, 10, 15,20,25,30,35,40,45,50,55,60].map(m => (
              <option key={m} value={m}>{m} min</option>
            ))}
          </select>
        </div>

        <LineChart width={900} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={t => new Date(t).toLocaleTimeString()} />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip labelFormatter={t => new Date(t).toLocaleString()} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="avgScore"
            name="Average Score"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="count"
            name="Event Count"
            stroke="#82ca9d"
            dot={false}
          />
        </LineChart>
      </div>
    </>
  );
}
