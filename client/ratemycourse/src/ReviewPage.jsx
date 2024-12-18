import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddReview = () => {
    const { courseId } = useParams();  // Get courseId from URL
    const [course, setCourse] = useState(null);  // Store course data
    const [user, setUser] = useState('');  // Store user name
    const [rating, setRating] = useState(1);  // Store rating
    const [comment, setComment] = useState('');  // Store review comment
    const navigate = useNavigate();

    // Fetch course details based on the courseId
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/courses/${courseId}`);
                setCourse(response.data);  // Set course data if successful
            } catch (error) {
                console.error('Error fetching course details:', error);
                alert('Failed to load course details.');
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:5000/courses/${courseId}/reviews`, 
                { user, rating, comment }
            );

            if (response.status === 201) {
                alert('Review added successfully!');
                navigate(`/courses/${courseId}`);  // Navigate to course page after successful submission
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review.');
        }
    };

    if (!course) {
        return <p>Loading course details...</p>;  // Display loading if course is still being fetched
    }

    return (
        <div className="review-form">
            <h2>Add Review for {course.courseName}</h2>  {/* Display course name */}
            <p><strong>Professor:</strong> {course.professor}</p> {/* Display professor name */}
            <p><strong>Description:</strong> {course.description}</p> {/* Display course description */}
            
            <form onSubmit={handleSubmit}>
                <label>
                    User:
                    <input 
                        type="text" 
                        value={user}
                        onChange={(e) => setUser(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Rating:
                    <input 
                        type="number" 
                        value={rating} 
                        min="1" max="5" 
                        onChange={(e) => setRating(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Comment:
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        required 
                    />
                </label>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
