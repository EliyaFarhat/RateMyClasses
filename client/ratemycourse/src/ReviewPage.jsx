import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AddReview = () => {
  const { courseId } = useParams();
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState(''); 

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${courseId}`);
        setCourseName(response.data.courseName); 
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
        `http://localhost:5000/courses/${courseId}/reviews`,
        {
          user: username,
          rating: parseInt(rating, 10),
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Review added successfully!");
      setRating("");
      setComment("");
      setTimeout(() => navigate(`/courses/${courseId}`), 2000);
    } catch (error) {
      console.error("Error adding review:", error.response?.data?.message || error.message);
      setMessage("Failed to add review. Please try again.");
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add Review for: {courseName}</h2>  
      {!isLoggedIn ? (
        <p className="login-warning">You must be logged in to submit a review.</p>
      ) : (
        <div className="review-form">
          {message && <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="rating">Rating (1-5):</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Review:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
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
