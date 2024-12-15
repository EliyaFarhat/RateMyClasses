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
    console.log("yo dawg")
}



export const searchCourses = async (req, res) => {
    try {
        console.log('Search query received:', req.query.query); // Debug log
        
        const searchTerm = req.query.query;
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }

        // Match against courseCode first and only
        const courses = await Course.find({
            courseCode: { $regex: `^${searchTerm}`, $options: 'i' } // Match courseCode as prefix
        }).limit(10);

        console.log('Found courses:', courses); // Debug log
        res.status(200).json(courses); // Send matched courses back
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: "Error searching courses" });
    }
};

