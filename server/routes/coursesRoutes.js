import express from "express";

//.routes are paths to the functionality of http requests
//e.g, router.get('/path/way)

import { searchCourses, addReview, getCourseDetails} from "../controllers/courses.js";

const router = express.Router();

router.get("/:courseId", getCourseDetails);  // Add this line to fetch course details



router.get("/search", searchCourses)


router.post("/:courseId/reviews", addReview); // Add this line


export default router;
