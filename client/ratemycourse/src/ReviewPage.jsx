import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AddReview = () => {
  const { courseId } = useParams();
  const { isLoggedIn, username } = useAuth();
  const { state } = useLocation(); // Access state passed from navigation
  const courseName = state?.courseName || "Unknown Course"; // Fallback if courseName is not provided
  const navigate = useNavigate();

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

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
      <h3>Add Review for Course: {courseId}</h3> {/* Display course name */}
      {!isLoggedIn ? (
        <p>You must be logged in to submit a review.</p>
      ) : (
        <>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Rating (1-5):</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
              />
            </div>
            <div>
              <label>Review :</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddReview;
