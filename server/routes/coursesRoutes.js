import express from 'express';
import { searchCourses, addReview, getCourseById, removeAllReviews } from '../controllers/courses.js';

const router = express.Router();


router.get("/search", searchCourses);

router.get('/:courseId', getCourseById);

router.post("/:courseId/reviews", addReview);

router.delete("/:courseId/reviews", removeAllReviews);


export default router;
