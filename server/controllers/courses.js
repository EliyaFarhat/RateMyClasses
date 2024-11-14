// functions to be called by the routes at courses
//HEY ITS ME FREAKBBOb
// hi freakbob
//thanks for answering
//thanks for answering
//thanks for answering
// YOURE WELCOME FREAKBOB
//its hard being freeaky 
// *becomes freaky*

import Course from '../models/courseModel.js';



export const getCourses = (req, res) => {
    res.send("THIS WORKS!");
}
 

export const createCourse = async (req, res) => {
    const { courseName, description, school, courseCode, prerequisites, antirequisites } = req.body;

    const newCourse = new Course({
        courseName,
        description,
        school,
        courseCode,
        prerequisites,
        antirequisites
    });

    try {
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const searchCourses = async (req, res) => {
    const { query } = req.query;

    try {
        // Search for courses by course name or description (you can adjust this based on your needs)
        const courses = await Course.find({
            $or: [
                { courseName: { $regex: query, $options: 'i' } },  // Case-insensitive regex search on courseName
                { description: { $regex: query, $options: 'i' } }  // Case-insensitive regex search on description
            ]
        });

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
