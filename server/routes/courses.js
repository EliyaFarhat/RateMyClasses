import express from "express";

//.routes are paths to the functionality of http requests
//e.g, router.get('/path/way)

import { getCourses, searchCourses} from "../controllers/courses.js";

const router = express.Router();

// When we get to /courses, which is the root here, '/', call the getCourses function from the controller courses.js file
router.get("/", getCourses)

router.get("/search", searchCourses)



export default router;
