import mongoose from "mongoose"

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


const Professor = mongoose.model('Professor', courseSchema);
export default Professor;