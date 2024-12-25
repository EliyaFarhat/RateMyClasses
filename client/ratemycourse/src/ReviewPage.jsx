import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import './CSS Files/AddReviews.css'


const AddReview = () => {
  const { courseId } = useParams();
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState(''); 
  const [courseCode, setCourseCode] = useState(''); 


  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [professor, setProfessor] = useState("")

  


  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${courseId}`);
        setCourseName(response.data.courseName); 
        setCourseCode(response.data.courseCode); 

      } catch (error) {
        console.error("Error fetching course name:", error);
        setCourseName("Course not found");  
      }
    };

    fetchCourseName();
  }, [courseId]); // Only refetch if courseId changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/courses/${courseId}/reviews`, //sending user, rating, rating 
        {
          user: username,
          rating: parseInt(rating, 10),
          comment,
          professor, 
        },
        {
          headers: {
            "Content-Type": "application/json", //used to tell server what type of data to parse through
          },
        }
      );

      setMessage("Review added successfully!");
      setRating("");
      setComment("");
      setProfessor("");
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
            {/* Rating Field */}
            <div className="form-group">
              <label htmlFor="rating">Overall Rating (1-5):</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Rating
                </option>
                <option value="1">⭐ - Poor</option>
                <option value="2">⭐⭐ - Fair</option>
                <option value="3">⭐⭐⭐ - Good</option>
                <option value="4">⭐⭐⭐⭐ - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
              </select>
            </div>
  
            {/* Comment Field */}
            <div className="form-group">
              <label htmlFor="comment">Review:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Example: Amazing course taught by professor Alex Ufkes!"
              ></textarea>
            </div>
  
            {/* Professor Name Field */}
            <div className="form-group professor-name">
              <label htmlFor="professor">Professor</label>
              <textarea 
                id="professor"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="Taught by Professor ... (optional)"
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
