// backend/routes/analytics.js
import express from 'express';
import AdjustmentEvent from '../models/AdjustmentEvent.js';
const router = express.Router();

// GET /api/analytics/realtime-sentiment?minutes=5
router.get('/realtime-sentiment', async (req, res) => {
  const minutes = parseInt(req.query.minutes, 10) || 5;
  const since = new Date(Date.now() - minutes * 60 * 1000);

  try {
    const data = await AdjustmentEvent.aggregate([
      // 1) only events in the last `minutes`
      { $match: { timestamp: { $gte: since } } },
      // 2) bucket by minute (floor to minute)
      {
        $group: {
          _id: {
            year:   { $year: '$timestamp' },
            month:  { $month: '$timestamp' },
            day:    { $dayOfMonth: '$timestamp' },
            hour:   { $hour: '$timestamp' },
            minute: { $minute: '$timestamp' }
          },
          avgScore: { $avg: '$score' },
          count:    { $sum: 1 }
        }
      },
      // 3) re-shape into { time, avgScore, count }
      {
        $project: {
          _id: 0,
          time: {
            $dateFromParts: {
              year:  '$_id.year',
              month: '$_id.month',
              day:   '$_id.day',
              hour:  '$_id.hour',
              minute:'$_id.minute'
            }
          },
          avgScore: 1,
          count:    1
        }
      },
      // 4) sort by time ascending
      { $sort: { time: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    console.error('Realtime sentiment error:', err);
    res.status(500).json({ error: 'Failed to fetch realtime sentiment' });
  }
});

export default router;
