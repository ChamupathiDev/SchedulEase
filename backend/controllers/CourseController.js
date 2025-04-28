//CourseController.js
import Course from "../models/CourseModel.js";

// Add a new course module
export const addCourse = async (req, res) => {
    try {
        const { moduleName, moduleID, licName, licEmail, moduleCredit } = req.body;

        // Ensure all required fields are included
        const newCourse = new Course({
            moduleName,        // Add moduleName here
            moduleID,
            licName,
            licEmail,
            moduleCredit
        });

        await newCourse.save();
        res.json({ success: true, message: 'Course module added successfully' });
    } catch (error) {
        console.error('Error adding course module:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get all course modules
export const getCourses = async (req, res) => {
    try {
        const allCourses = await Course.find();
        res.json({ allCourses });
    } catch (error) {
        console.error('Error getting course modules:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get course by ID
// Get a course module by ID
export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, data: course });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

  

// Update a course module by ID
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Fields to update
        const { moduleName, moduleID, licName, licEmail, moduleCredit } = req.body;

        // Find and update the course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,  // Find the course by ID
            { moduleName, moduleID, licName, licEmail, moduleCredit },  // Update data
            { new: true }  // Return the updated course
        );

        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: 'Course module not found' });
        }

        res.json({ success: true, message: 'Course module updated successfully', data: updatedCourse });
    } catch (error) {
        console.error('Error updating course module:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete a course module by ID
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;  // Retrieve the course ID from URL parameters

        // Delete the course by ID
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: 'Course module not found' });
        }

        res.json({ success: true, message: 'Course module deleted successfully', data: deletedCourse });
    } catch (error) {
        console.error('Error deleting course module:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
