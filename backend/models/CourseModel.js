//CourseModel.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    moduleName: { type: String, required: true },
    moduleID: { type: String, required: true, unique: true },
    licName: { type: String, required: true },
    licEmail: { type: String, required: true },
    moduleCredit: { type: Number, required: true }
},
  { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);
export default Course;
