import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import './CSS Files/AddReviews.css';

const AddReview = () => {
  const { courseId } = useParams();
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null); // For hover effect
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [professor, setProfessor] = useState('');

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await axios.get(`https://ratemyclasses-3.onrender.com/courses/${courseId}`);
        setCourseName(response.data.courseName);
        setCourseCode(response.data.courseCode);
      } catch (error) {
        console.error("Error fetching course name:", error);
        setCourseName("Course not found");
      }
    };

    fetchCourseName();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `https://ratemyclasses-3.onrender.com/courses/${courseId}/reviews`, 
        {
          user: username,
          rating: parseInt(rating, 10),
          comment,
          professor,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Review added successfully!");
      setRating(null);
      setComment('');
      setProfessor('');
      setTimeout(() => navigate(`/courses/${courseId}`), 2000);
    } catch (error) {
      console.error("Error adding review:", error.response?.data?.message || error.message);
      setMessage("Failed to add review. Please try again.");
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add Review for: {courseName} ({courseCode})</h2>
      {!isLoggedIn ? (
        <p className="login-warning">You must be logged in to submit a review.</p>
      ) : (
        <div className="review-form">
          {message && (
            <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="form">
      
            <div className="form-group">
              <label htmlFor="rating">Overall Rating (1-5):</label>
            <div className="star-rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={`star ${hoverRating >= star || rating >= star ? 'filled' : ''}`}
      onMouseEnter={() => setHoverRating(star)}
      onMouseLeave={() => setHoverRating(null)}
      onClick={() => setRating(star)}
      role="button"
      aria-label={`Rate ${star} stars`}
    >
      {hoverRating >= star || rating >= star ? '🌟' : '⭐'}
    </span>
  ))}
</div>

            </div>

            {/* Comment Field */}
            <div className="form-group">
              <label htmlFor="comment">Review:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Example: Amazing course content!!"
              ></textarea>
            </div>

            {/* Professor Name Field */}
            <div className="form-group professor-name">
              <label htmlFor="professor">Professor (Optional) </label>
              <textarea
                id="professor"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="Taught by .. " 
              ></textarea>
            </div>

            <button type="submit" className="submit-button">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddReview;
