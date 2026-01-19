// src/components/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
} from "recharts";
import AdminNavAndSidebar from "../AdminPanel/AdminNavAndSidebar";

const RANGE_OPTIONS = [
  { label: "Last 1 hour", value: "1h", defaultBucket: "1m" },
  { label: "Last 24 hours", value: "24h", defaultBucket: "15m" },
  { label: "Last 7 days", value: "7d", defaultBucket: "1h" },
  { label: "Last 30 days", value: "30d", defaultBucket: "1d" },
];

const BUCKET_OPTIONS = ["1m", "5m", "15m", "1h", "1d"];

function formatTick(t, range) {
  const d = new Date(t);
  if (Number.isNaN(d.getTime())) return String(t);
  if (range === "7d" || range === "30d") return d.toLocaleDateString();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const d = new Date(label);
  const avgScore = payload.find((p) => p.dataKey === "avgScore")?.value;
  const count = payload.find((p) => p.dataKey === "count")?.value;

  return (
    <div className="rounded-lg border bg-white p-3 shadow-md">
      <div className="text-sm font-medium">
        {Number.isNaN(d.getTime()) ? String(label) : d.toLocaleString()}
      </div>

      <div className="mt-2 text-sm">
        Avg score:{" "}
        <span className="font-semibold">
          {avgScore == null ? "—" : Number(avgScore).toFixed(2)}
        </span>
      </div>

      <div className="text-sm">
        Events: <span className="font-semibold">{count ?? "—"}</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("24h");
  const [bucket, setBucket] = useState("15m");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedRange = useMemo(
    () => RANGE_OPTIONS.find((r) => r.value === range),
    [range]
  );

  // Auto-set bucket when range changes (nice UX)
  useEffect(() => {
    if (selectedRange?.defaultBucket) setBucket(selectedRange.defaultBucket);
  }, [selectedRange]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `/api/analytics/sentiment?range=${range}&bucket=${bucket}`,
          { withCredentials: true }
        );

        const rows = Array.isArray(res.data) ? res.data : [];

        // Normalize and sort to be safe
        const normalized = rows
          .map((r) => ({
            time: r.time,
            avgScore: r.avgScore,
            count: r.count,
          }))
          .sort((a, b) => new Date(a.time) - new Date(b.time));

        if (!cancelled) setData(normalized);
      } catch (err) {
        console.error("Error fetching sentiment:", err);
        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load analytics";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    // Poll only for shorter windows
    const shouldPoll = range === "1h" || range === "24h";
    if (!shouldPoll) return () => { cancelled = true; };

    const id = setInterval(fetchData, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [range, bucket]);

  const latest = data.length ? data[data.length - 1] : null;
  const totalEvents = data.reduce((sum, p) => sum + (p.count || 0), 0);

  return (
    <>
      <AdminNavAndSidebar />

      <div className="ml-64 mt-16 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Mood Analytics</h1>

          <div className="flex flex-wrap items-center gap-2">
            <select
              className="rounded-lg border px-3 py-2 bg-white"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              {RANGE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <select
              className="rounded-lg border px-3 py-2 bg-white"
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
            >
              {BUCKET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  Bucket: {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Latest avg score</div>
            <div className="mt-1 text-2xl font-semibold">
              {latest?.avgScore != null ? Number(latest.avgScore).toFixed(2) : "—"}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Latest events (bucket)</div>
            <div className="mt-1 text-2xl font-semibold">{latest?.count ?? "—"}</div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Total events (range)</div>
            <div className="mt-1 text-2xl font-semibold">{totalEvents}</div>
          </div>
        </div>

        {/* Avg score chart */}
        <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-lg font-semibold">Average score over time</div>
            {loading && <div className="text-sm text-gray-500">Loading…</div>}
          </div>

          {error && (
            <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="mb-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              No analytics data for the selected range.
            </div>
          )}

          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(t) => formatTick(t, range)}
                  tickMargin={10}
                  minTickGap={24}
                />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="avgScore"
                  name="Average Score"
                  strokeWidth={2}
                  dot={false}
                  fillOpacity={0.18}
                  connectNulls
                />
                <Brush dataKey="time" height={26} travellerWidth={10} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Count chart */}
        <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-lg font-semibold">Event count over time</div>

          {!loading && !error && data.length === 0 && (
            <div className="mb-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              No analytics data for the selected range.
            </div>
          )}

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(t) => formatTick(t, range)}
                  tickMargin={10}
                  minTickGap={24}
                />
                <YAxis allowDecimals={false} domain={[0, "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Event Count"
                  strokeWidth={2}
                  dot={false}
                  fillOpacity={0.18}
                  connectNulls
                />
                <Brush dataKey="time" height={26} travellerWidth={10} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
