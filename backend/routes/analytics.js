// backend/routes/analytics.js
import express from 'express';
import AdjustmentEvent from '../models/AdjustmentEvent.js';
const router = express.Router();

// GET /api/analytics/daily-sentiment?days=7
router.get('/daily-sentiment', async (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const since = new Date(Date.now() - days * 24*60*60*1000);

// GET /api/analytics/recent-events?start=2024-01-01&end=2024-02-01
router.get('/recent-events', async (req, res) => {
    const { start, end } = req.query;
  
    // Validate and parse the dates
    const startDate = start ? new Date(start) : new Date(0); // defaults to earliest date
    const endDate = end ? new Date(end) : new Date(); // defaults to now
  
    try {
      const events = await AdjustmentEvent.find({
        timestamp: {
          $gte: startDate,
          $lte: endDate
        }
      }).sort({ timestamp: -1 });
  
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  

  // Group by day, compute average score
  const data = await AdjustmentEvent.aggregate([
    { $match: { timestamp: { $gte: since } } },
    {
      $group: {
        _id: {
          year:  { $year: '$timestamp' },
          month: { $month: '$timestamp' },
          day:   { $dayOfMonth: '$timestamp' }
        },
        avgScore:    { $avg: '$score' },
        countEvents: { $sum: 1 }
      }
    },
    {
      $project: {
        date: { 
          $dateFromParts: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day'
          }
        },
        avgScore: 1,
        countEvents: 1
      }
    },
    { $sort: { date: 1 } }
  ]);

  res.json(data);
});

export default router;
