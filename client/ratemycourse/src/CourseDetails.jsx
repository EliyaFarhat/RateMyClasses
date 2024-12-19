import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
    const { courseId } = useParams(); // Get courseId from the URL parameters
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/courses/${courseId}`);
                setCourse(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]); // Refetch when courseId changes

    if (loading) {
        return <p>Loading course details...</p>;
    }

    return (
        <div className="course-detail">
            {course ? (
                <div>
                    <h2>{course.courseName} ({course.courseCode})</h2>
                    <p>{course.description}</p>

                    <p><strong>Average Rating:</strong> {course.averageRating?.toFixed(1) || "N/A"}</p>

                    {/* Reviews Section */}
                    <div className="reviews">
                        <h3>Reviews</h3>
                        {course.reviews.length > 0 ? (
                            course.reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p><strong>User:</strong> {review.user}</p>
                                    <p><strong>Rating:</strong> {review.rating}/5</p>
                                    <p><strong>Comment:</strong> {review.comment}</p>
                                    <p><em>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</em></p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No reviews available for this course.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Course not found.</p>
            )}
        </div>
    );
};

export default CourseDetail;
