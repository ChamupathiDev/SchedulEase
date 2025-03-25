// backend/controllers/MoodController.js
import Sentiment from 'sentiment';
import Schedule from '../models/ScheduleModel.js';
import { io } from '../utils/socket.js';
import kafkaProducer from '../utils/kafkaProducer.js';

const sentiment = new Sentiment();

export const analyzeMood = async (req, res) => {
  try {
    const { moodText, userSuggestion } = req.body;
    const email = req.user.email; // assuming verifyToken middleware sets req.user

    if (!moodText) {
      return res.status(400).json({ message: 'Mood text is required' });
    }

    // Compute sentiment score
    const result = sentiment.analyze(moodText);
    const score = result.score;

    // Determine suggestion: if user provided one, use it; otherwise generate based on score
    let suggestion = userSuggestion;
    if (!suggestion) {
      if (score < 0) {
        suggestion = "Your mood seems low. Consider taking a short break or a relaxing activity.";
      } else if (score === 0) {
        suggestion = "Your mood is neutral. Maybe a brief pause could help you reflect.";
      } else {
        suggestion = "You seem upbeat! Perhaps tackle a challenging task now while riding the positive wave.";
      }
    }

    // Adjust today’s flex schedules for the current user
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

    const flexSchedules = await Schedule.find({
      email,
      scheduleType: 'flex',
      scheduleDate: { $gte: todayStart, $lte: todayEnd }
    });

    // Define adjustment: if mood is negative, add 15 minutes (postpone start and extend end),
    // if positive, subtract 15 minutes (start earlier and finish earlier).
    const adjustmentMinutes = score < 0 ? 15 : (score > 0 ? -15 : 0);
    let updatedSchedules = [];

    for (const schedule of flexSchedules) {
      let newStart = new Date(schedule.startTime);
      let newEnd = new Date(schedule.endTime);

      if (adjustmentMinutes !== 0) {
        newStart = new Date(newStart.getTime() + adjustmentMinutes * 60000);
        newEnd = new Date(newEnd.getTime() + adjustmentMinutes * 60000);
      }

      const updated = await Schedule.findByIdAndUpdate(
        schedule._id,
        { startTime: newStart, endTime: newEnd },
        { new: true }
      );
      updatedSchedules.push(updated);
    }

    // Send notification via WebSocket (using user’s email as the room)
    io.to(email).emit("scheduleUpdated", {
      message: "Your schedule has been adjusted based on your mood.",
      suggestion,
      updatedSchedules
    });

    // Publish a Kafka event for logging/analytics purposes
    await kafkaProducer.send({
      topic: 'scheduleAdjustments',
      messages: [
        {
          value: JSON.stringify({
            email,
            moodText,
            score,
            suggestion,
            updatedSchedules
          }),
        },
      ],
    });

    return res.status(200).json({
      message: "Schedule updated based on your mood",
      suggestion,
      updatedSchedules
    });
  } catch (err) {
    console.error("Error analyzing mood:", err);
    return res.status(500).json({ message: "Error processing mood", error: err.message });
  }
};
