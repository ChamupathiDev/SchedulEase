import express from "express";
import AdjustmentEvent from "../models/AdjustmentEvent.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

function rangeToSince(range) {
  const now = Date.now();
  switch (range) {
    case "1h": return new Date(now - 1 * 60 * 60 * 1000);
    case "24h": return new Date(now - 24 * 60 * 60 * 1000);
    case "7d": return new Date(now - 7 * 24 * 60 * 60 * 1000);
    case "30d": return new Date(now - 30 * 24 * 60 * 60 * 1000);
    default: return new Date(now - 24 * 60 * 60 * 1000);
  }
}

function bucketToMs(bucket) {
  switch (bucket) {
    case "1m": return 60 * 1000;
    case "5m": return 5 * 60 * 1000;
    case "15m": return 15 * 60 * 1000;
    case "1h": return 60 * 60 * 1000;
    case "1d": return 24 * 60 * 60 * 1000;
    default: return 15 * 60 * 1000;
  }
}

// ✅ Long range analytics
router.get("/sentiment", verifyToken, verifyAdmin, async (req, res) => {
  const range = String(req.query.range || "24h");
  const bucket = String(req.query.bucket || "15m");

  const since = rangeToSince(range);
  const bucketMs = bucketToMs(bucket);

  try {
    const data = await AdjustmentEvent.aggregate([
      { $match: { timestamp: { $gte: since } } },
      {
        $addFields: {
          bucketTime: {
            $toDate: {
              $subtract: [
                { $toLong: "$timestamp" },
                { $mod: [{ $toLong: "$timestamp" }, bucketMs] },
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: "$bucketTime",
          avgScore: { $avg: "$score" },
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, time: "$_id", avgScore: 1, count: 1 } },
      { $sort: { time: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    console.error("Sentiment analytics error:", err);
    res.status(500).json({ error: "Failed to fetch sentiment analytics" });
  }
});

export default router; 
