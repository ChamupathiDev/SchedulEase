import Schedule from "../Model/ScheduleModel.js";

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
    const {
        scheduleId,
        moduleName,
        gmail,
        moduleId,
        scheduleDate,
        scheduleType,
        startTime,
        endTime,
    } = req.body;

    // 1. Required fields check
    if (!scheduleId || !moduleName || !gmail || !moduleId || !scheduleDate || !scheduleType || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(gmail)) {
        return res.status(400).json({ message: "Only Gmail addresses are allowed." });
    }
    
    // 3. Schedule type check
    if (!["fix", "flex"].includes(scheduleType)) {
        return res.status(400).json({ message: "Schedule Type must be either 'fix' or 'flex'." });
    }

    // 4. Parse and validate date/time fields
    const now = new Date();
    const parsedScheduleDate = new Date(scheduleDate);
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);

    if (parsedScheduleDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
        return res.status(400).json({ message: "Schedule date must be today or in the future." });
    }

    if (isNaN(parsedStartTime.getTime()) || isNaN(parsedEndTime.getTime())) {
        return res.status(400).json({ message: "Start Time and End Time must be valid date/time values." });
    }

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    if (!isSameDay(parsedStartTime, parsedScheduleDate) || !isSameDay(parsedEndTime, parsedScheduleDate)) {
        return res.status(400).json({ message: "Start and End times must be on the same day as the Schedule Date." });
    }

    if (parsedEndTime <= parsedStartTime) {
        return res.status(400).json({ message: "End Time must be after Start Time." });
    }

    // 5. Store the provided input as-is (no date transformation)
    try {
        const schedule = new Schedule({
            scheduleId,
            moduleName,
            gmail,
            moduleId,
            scheduleDate,   // stored as string
            scheduleType,
            startTime,      // stored as string
            endTime         // stored as string
        });

        await schedule.save();

        return res.status(201).json({
            message: "Schedule added successfully.",
            schedule
        });
    } catch (err) {
        console.error("Error adding schedule:", err);
        return res.status(500).json({ message: "Error saving schedule", error: err.message });
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
const getSchedulesByGmail = async (req, res) => {
    try {
        const schedules = await Schedule.find({ gmail: req.params.gmail });

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
