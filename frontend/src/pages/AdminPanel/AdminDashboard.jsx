// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import AdminNavandSidebar from "../AdminPanel/AdminNavAndSidebar";

export default function AdminDashboard() {
  const [raw, setRaw] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [barData, setBarData] = useState([]);

  // fetch mood adjustment events
  useEffect(() => {
    axios.get('/api/analytics/recent-events').then(res => {
      const events = res.data;
      setRaw(events);
      // prepare pie: count negative/neutral/positive
      const counts = events.reduce(
        (acc, e) => {
          if (e.score < 0) acc[0].value++;
          else if (e.score === 0) acc[1].value++;
          else acc[2].value++;
          return acc;
        },
        [
          { name: 'Negative', value: 0 },
          { name: 'Neutral', value: 0 },
          { name: 'Positive', value: 0 }
        ]
      );
      setPieData(counts);
      // prepare category pie: suggestions frequency
      const freq = {};
      events.forEach(e => { freq[e.suggestion] = (freq[e.suggestion] || 0) + 1; });
      setCategoryData(Object.entries(freq).map(([name, value]) => ({ name, value })));
      // prepare bar: daily counts
      const byDay = {};
      events.forEach(e => {
        const day = new Date(e.timestamp).toLocaleDateString();
        byDay[day] = (byDay[day] || 0) + 1;
      });
      setBarData(Object.entries(byDay).map(([date, count]) => ({ date, count })));
    });
  }, []);

  // CSV export
  const exportCSV = () => {
    const header = ['timestamp,email,score,suggestion'];
    const lines = raw.map(e => [
      new Date(e.timestamp).toISOString(),
      e.email,
      e.score,
      '"' + e.suggestion.replace(/"/g,'""') + '"'
    ].join(','));
    const csv = header + '\n' + lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mood_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const COLORS = ['#FF6384', '#FFCD56', '#36A2EB', '#4BC0C0', '#9966FF'];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
    <AdminNavandSidebar />
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Mood Distribution (30 days)</h2>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Suggestion Frequency</h2>
          <PieChart width={300} height={300}>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={100} label>
              {categoryData.map((entry, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Daily Event Counts</h2>
          <BarChart width={800} height={300} data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="Events" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <button
        onClick={exportCSV}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download CSV Report
      </button>
    </div>
    </div>
  );
}
