import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS Files/Results.css'; // Ensure this path is correct

const CourseResults = () => {
    const { query } = useParams(); // Get the query from the URL
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/courses/search?query=${query}`);
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };
        fetchCourses();
    }, [query]);

    const handleAddReview = (courseId) => {
        navigate(`/courses/review/${courseId}`); // Navigate to the Add Review page
    };

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`); // Navigate to the course detail page
    };

    if (loading) {
        return <p>Loading courses...</p>;
    }

    return (
        <div className="results-container">
            <h2 className='searchthing'>Search Results for "{query}"</h2>
            
      
            {courses.length > 0 ? (
                <div className="course-cards">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="course-card"
                            onClick={() => handleCourseClick(course._id)} // Make card clickable
                        >
                            <div className="course-info">
                                <h3 className="course-code">{course.courseCode}</h3>
                                <p className="course-description">{course.description}</p>
                                <p className="">{course.prerequisite}</p>
                                <p className="course-rating">
                                    <strong>Average Rating:</strong> {course.rating || "N/A"}
                                </p>
                            </div>
                            <button
                                className="add-review-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent clicking the button from triggering card click
                                    handleAddReview(course._id);
                                }}
                            >
                                Add Review
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses found for "{query}".</p>
            )}
            <button onClick={() => navigate('/')} className="home-btn">
                Home Page
            </button>
        </div>
    );
};

export default CourseResults;
