import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    courseName: { type: String, required: true },
    description: { type: String },
    school: { type: String },
    courseCode: { type: String, required: true, unique: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of references to other courses
    antirequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]  // Array of references to courses that conflict with this one
});

const professorSchema = {
    name: String,
    department: String,
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    ratings: [{
      rating: Number,
      difficulty: Number,
      comment: String,
      wouldTakeAgain: Boolean,
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }],
    averageRating: Number,
    averageDifficulty: Number,
    totalRatings: Number
  }


// Create the Course model from the schema
const Course = mongoose.model('Course', courseSchema);
const Professor = mongoose.model('Professor', courseSchema);

export default Course;