import express from 'express';
import { searchCourses, addReview, getCourseById } from '../controllers/courses.js';

const router = express.Router();

// define the search route
router.get("/search", searchCourses);

// ,efine the route for fetching a course by ID
router.get('/:courseId', getCourseById);

// define the route for adding reviews to a course
router.post("/:courseId/reviews", addReview);

export default router;
