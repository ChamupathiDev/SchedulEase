// backend/controllers/MoodController.js
import Sentiment from "sentiment";
import Schedule from "../models/ScheduleModel.js";
import { io } from "../utils/socket.js";
import kafkaProducer from "../utils/kafkaProducer.js";

const sentiment = new Sentiment();

export const analyzeMood = async (req, res) => {
  try {
    const { moodText, confirmUpdate } = req.body;
    const email = req.user.email; // assuming verifyToken middleware sets req.user

    if (!moodText) {
      return res.status(400).json({ message: "Mood text is required" });
    }

    // Compute sentiment score
    const result = sentiment.analyze(moodText);
    const score = result.score;

    // Determine suggestion: if user provided one, use it; otherwise generate based on score
    let suggestion = "";
    if (!suggestion) {
      if (score < 0) {
        suggestion =
          "Your mood seems low. Consider taking a short break or a relaxing activity.";
      } else if (score === 0) {
        suggestion =
          "Your mood is neutral. Maybe a brief pause could help you reflect.";
      } else {
        suggestion =
          "You seem upbeat! Perhaps tackle a challenging task now while riding the positive wave.";
      }
    }

    // Calculate adjustment minutes based on sentiment score.
    const adjustmentMinutes = score < 0 ? 15 : score > 0 ? -15 : 0;

    // Define today's time boundaries.
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));
    const now = new Date();

    // Get today's flex schedules for the current user that haven't started yet.
    const flexSchedules = await Schedule.find({
      email,
      scheduleType: "flex",
      scheduleDate: { $gte: todayStart, $lte: todayEnd },
      startTime: { $gte: now },
    });

    // If no flex schedules are available, return early with a message.
    if (flexSchedules.length === 0) {
      return res.status(200).json({
        message: "No flex schedules available for update.",
        suggestion,
        proposedSchedules: [],
      });
    }

    // Build an array of proposed changes.
    const proposals = flexSchedules.map((schedule) => {
      let newStart = new Date(schedule.startTime);
      let newEnd = new Date(schedule.endTime);
      if (adjustmentMinutes !== 0) {
        newStart = new Date(newStart.getTime() + adjustmentMinutes * 60000);
        newEnd = new Date(newEnd.getTime() + adjustmentMinutes * 60000);
      }
      return {
        _id: schedule._id,
        moduleId: schedule.moduleId,
        moduleName: schedule.moduleName,
        scheduleType: schedule.scheduleType,
        oldStartTime: schedule.startTime,
        oldEndTime: schedule.endTime,
        proposedStartTime: newStart,
        proposedEndTime: newEnd,
      };
    });

    // If the user has NOT confirmed, just return the proposal.
    if (!confirmUpdate) {
      return res.status(200).json({
        message: "Here is your schedule adjustment suggestion.",
        suggestion,
        proposedSchedules: proposals,
      });
    }

    // If the user confirms, update the schedules in the database.
    let updatedSchedules = [];
    for (const schedule of flexSchedules) {
      let newStart = new Date(schedule.startTime);
      let newEnd = new Date(schedule.endTime);
      if (adjustmentMinutes !== 0) {
        newStart = new Date(newStart.getTime() + adjustmentMinutes * 60000);
        newEnd = new Date(newEnd.getTime() + adjustmentMinutes * 60000);
      }
      // Update the schedule and add a flag to indicate it was updated by mood.
      const updated = await Schedule.findByIdAndUpdate(
        schedule._id,
        {
          startTime: newStart,
          endTime: newEnd,
          updatedByMood: true,
          updatedAt: new Date(),
        },
        { new: true }
      );
      updatedSchedules.push(updated);
    }

    // Send notification via WebSocket (using user’s email as the room)
    io.to(email).emit("scheduleUpdated", {
      message: "Your schedule has been updated based on your mood.",
      suggestion,
      updatedSchedules,
    });

    // Publish a Kafka event for logging/analytics purposes
    await kafkaProducer.send({
      topic: "scheduleAdjustments",
      messages: [
        {
          value: JSON.stringify({
            email,
            moodText,
            score,
            suggestion,
            updatedSchedules,
          }),
        },
      ],
    });

    return res.status(200).json({
      message: "Schedule updated based on your mood",
      suggestion,
      updatedSchedules,
    });
  } catch (err) {
    console.error("Error analyzing mood:", err);
    return res
      .status(500)
      .json({ message: "Error processing mood", error: err.message });
  }
};


