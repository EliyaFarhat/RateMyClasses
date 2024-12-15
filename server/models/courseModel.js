import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    courseName: { type: String, required: true },
    description: { type: String },
    school: { type: String },
    courseCode: { type: String, required: true, unique: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of references to other courses
    antirequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]  // Array of references to courses that conflict with this one
});

const Course = mongoose.model('Course', courseSchema);

export default Course;