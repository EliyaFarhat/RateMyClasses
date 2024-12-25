import Course from '../models/courseModel.js';

export const addReview = async (req, res) => {
    const { courseId } = req.params; // Extract course ID from URL
    const { user, rating, comment, professor } = req.body; // Extract review data

    try {
        
        if (!user || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Create the review object
        const newReview = { user, rating, comment, professor};

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
        const searchTerm = req.query.query;
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }

        // Match against courseCode first and only
        const courses = await Course.find({
            courseCode: { $regex: `^${searchTerm}`, $options: 'i' }
        }).limit(10);

        res.status(200).json(courses); // Send matched courses back
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: "Error searching courses" });
    }
};



export const getCourseById = async (req, res) => {
    const { courseId } = req.params; // Get courseId from the URL

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course); // Return the course details
    } catch (error) {
        console.error("Error fetching course details:", error.message);
        res.status(500).json({ message: "Error fetching course details", error: error.message });
    }
};


export const removeAllReviews = async (req, res) => {
    const { courseId } = req.params; // Extract courseId from URL

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Clear the reviews array and reset averageRating
        course.reviews = [];
        course.averageRating = 0;

        await course.save(); // Save the updated course document

        res.status(200).json({ message: "All reviews removed successfully", course });
    } catch (error) {
        console.error("Error removing reviews:", error.message);
        res.status(500).json({ message: "Error removing reviews", error: error.message });
    }
};
