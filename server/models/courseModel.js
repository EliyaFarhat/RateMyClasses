import mongoose from 'mongoose';

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    professor: {type:String, required: false},
});

// Define the Course Schema
const courseSchema = mongoose.Schema({
    courseName: { type: String, required: true },
    description: { type: String },
    school: { type: String },
    courseCode: { type: String, required: true, unique: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    gpaWeight: { type: String },
    weeklyContact: { type: String },
    major: { type: String, required: true },
    reviews: [reviewSchema], // embed reviews directly in the course schema
    averageRating: { type: Number, default: 0 }, 
});

// Create the Course Model
const Course = mongoose.model('Course', courseSchema);

export default Course;
