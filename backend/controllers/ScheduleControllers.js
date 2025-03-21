import Schedule from "../models/ScheduleModel.js";
import { errorHandler } from "../utils/error.js";

// Get all schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        if (!schedules.length) {
            return res.status(404).json({ message: "No schedules found", schedules: [] });
        }
        return res.status(200).json({ schedules });
    } catch (err) {
        console.error("Error fetching schedules:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a schedule
const addSchedules = async (req, res) => {
    const { scheduleId, moduleName, email, moduleId, scheduleDate, scheduleType, startTime, endTime } = req.body;

    if (!scheduleId || !moduleName || !email || !moduleId || !scheduleDate || !scheduleType || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Schedule Type validation
    if (!["fix", "flex"].includes(scheduleType)) {
        return res.status(400).json({ message: "Invalid schedule type. Must be 'fix' or 'flex'." });
    }

    // Ensure scheduleDate is a future date
    

    try {
        const schedules = new Schedule({
            scheduleId,
            moduleName,
            email,
            moduleId,
            scheduleDate,
            scheduleType,
            startTime,
            endTime,
        });

        await schedules.save();
        return res.status(201).json({ schedules });
    } catch (err) {
        console.error("Error adding schedule:", err);
        return res.status(500).json({ message: "Error adding schedule", error: err.message });
    }
};

// Get schedule by ID
const getById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        return res.status(200).json({ schedule });
    } catch (err) {
        console.error("Error fetching schedule:", err);
        return res.status(500).json({ message: "Error fetching schedule", error: err.message });
    }
};

// Update schedule
const updateSchedule = async (req, res) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedSchedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        return res.status(200).json({ updatedSchedule });
    } catch (err) {
        console.error("Error updating schedule:", err);
        return res.status(500).json({ message: "Error updating schedule", error: err.message });
    }
};

// Delete schedule
const deleteSchedule = async (req, res) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        return res.status(200).json({ message: "Schedule deleted successfully", deletedSchedule });
    } catch (err) {
        console.error("Error deleting schedule:", err);
        return res.status(500).json({ message: "Error deleting schedule", error: err.message });
    }
};

// Get schedules by email
const getSchedulesByGmail = async (req, res, next) => {
    try {

        // Find user by ID from URL param
        const schedules = await Schedule.findById(req.params.id);
        if (!schedules) return next(errorHandler(404, 'Schedule not found!'));

        // Check if email in token matches user's email
        if (req.user.email !== schedules.email) {
            return next(errorHandler(401, 'You can get only your schedule!'));
        }
        

        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ message: "No schedules found for this email" });
        }

        return res.status(200).json({ schedules });
    } catch (err) {
        console.error("Error fetching schedules by email:", err);
        return res.status(500).json({ message: "Error fetching schedules", error: err.message });
    }
};

export { getAllSchedules, addSchedules, getById, updateSchedule, deleteSchedule, getSchedulesByGmail };


