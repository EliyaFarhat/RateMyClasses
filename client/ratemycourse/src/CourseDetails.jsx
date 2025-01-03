import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './CSS Files/CourseDetail.css'; 
//add reviews here
const CourseDetail = () => {
    const { courseId } = useParams(); 
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const handleAddReview = (courseID) => {
        navigate(`/courses/review/${courseID}`);
    };


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://ratemyclasses.onrender.com/courses/${courseId}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]); // Fetch course details when courseId changes

    if (loading) return <p>Loading course details...</p>;

    if (!course) return <p>Course not found.</p>;
    

    return (
        <div className="course-detail-container">
            <div className="course-detail">
                <h2 className="course-title">{course.courseName} ({course.courseCode})</h2>
                <p className="course-description">{course.description}</p>
                <button className='add-review-button'   
                onClick={(e) => {
                                    e.stopPropagation(); // Prevent clicking the button from triggering card click
                                    handleAddReview(course._id);
                                    console.log('hello')
                                }}>Add Review</button>

                <p className="course-rating">
                    <strong>Average Rating:</strong> {course.averageRating?.toFixed(1) || "N/A"}
                </p>
            </div>

            <div className="reviews">
                <h3 className="reviews-title">Reviews</h3>
                {course.reviews && course.reviews.length > 0 ? (
                    course.reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <p><strong>User:</strong> {review.user}</p>
                            <p><strong >Rating:</strong> {review.rating}/5</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <p><strong>Professor:</strong> {review.professor}</p>
                            <p className="review-date"><em>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</em></p>
                        </div>
                    ))
                ) : (
                    <p className="no-reviews">No reviews available for this course.</p>
                )}
            </div>
        </div>
    );
};

export default CourseDetail;
