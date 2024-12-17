import express from "express";

//.routes are paths to the functionality of http requests
//e.g, router.get('/path/way)

import { searchCourses, addReview } from "../controllers/courses.js";

const router = express.Router();


router.get('/', (req, res) => {
    console.log("hello!")
})
router.get("/search", searchCourses)


router.post("/:courseId/reviews", addReview); // Add this line


export default router;
