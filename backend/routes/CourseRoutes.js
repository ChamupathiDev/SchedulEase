import express from 'express';
import { addCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/CourseController.js';

const router = express.Router();

router.post('/courses', addCourse);                // POST request to add a course
router.get('/courses', getCourses);                // GET request to get all courses
router.get('/courses/:id', getCourseById);         // GET request to get a single course by ID
router.put('/courses/:id', updateCourse);          // PUT request to update a course by ID
router.delete('/courses/:id', deleteCourse);       // DELETE request to delete a course by ID

export default router;
