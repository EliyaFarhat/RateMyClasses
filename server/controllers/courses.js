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



export const addReview = async (req, res) => {
    const { courseId } = req.params; // Extract course ID from URL
    const { user, rating, comment } = req.body; // Extract review data

    try {
        // Check if all fields are provided
        if (!user || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Create the review object
        const newReview = { user, rating, comment };

        // Add review to the course and update average rating
        course.reviews.push(newReview);
        course.averageRating =
            course.reviews.reduce((sum, review) => sum + review.rating, 0) /
            course.reviews.length;

        await course.save(); // Save the updated course document

        res.status(201).json({ message: "Review added successfully", course });
    } catch (error) {
        console.error("Error adding review:", error.message); // Log error message
        console.error("Full error details:", error); // Log full error object for debugging
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};



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

