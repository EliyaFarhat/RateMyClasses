// This handles every directory /courses, everything under here is a sub directory

import express from "express";

// imports function to be called by a route, references func from other file to be used
// like requiring func from mod script
import { getCourses, searchCourses} from "../controllers/courses.js";

const router = express.Router();

// When we get to /courses, which is the root here, '/', call the getCourses function from the controller courses.js file
router.get("/", getCourses)

router.get("/search", searchCourses)



export default router;
