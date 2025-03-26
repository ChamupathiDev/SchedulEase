import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const scheduleSchema = new Schema({
    scheduleId: {
        type: String, 
        required: [true, "Schedule ID is required."], 
        unique: true, // Ensure scheduleId is unique
        trim: true 
    },
    moduleName: {
        type: String, 
        required: [true, "Module Name is required."], 
        trim: true,
        minlength: [3, "Module Name must be at least 3 characters long."],
        maxlength: [100, "Module Name cannot exceed 100 characters."]
    },
    email: {
        type: String, 
        required: [true, "Email is required."], 
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid email format."]
    },
    moduleId: {
        type: String, 
        required: [true, "Module ID is required."], 
        trim: true 
    },
    scheduleDate: {
        type: Date, 
        required: [true, "Schedule Date is required."], 
        
    },
    scheduleType: {
        type: String, 
        enum: {
            values: ["fix", "flex"],
            message: "Schedule Type must be either 'fix' or 'flex'."
        },
        required: [true, "Schedule Type is required."]
    },
    startTime: {
        type: Date, 
        required: [true, "Start Time is required."],
    },
    endTime: {
        type: Date, 
        required: [true, "End Time is required."],
        validate: {
            validator: function(value) {
                return this.startTime && value > this.startTime; // Ensure endTime is after startTime
            },
            message: "End Time must be after Start Time."
        }
    },

     // New field to flag mood-based updates
     updatedByMood: { 
        type: Boolean, 
        default: false 
    },
    // Optionally, track the time of the update
    updatedAt: {
        type: Date
    }
});

// Export the model
export default model("ScheduleModel", scheduleSchema);
