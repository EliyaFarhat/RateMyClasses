import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate here
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

    if (loading) {
        return <p>Loading courses...</p>;
    }

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            <div>
                {courses.length > 0 ? (
                    <ul>
                        {courses.map((course) => (
                            <li key={course._id}>
                                <p><strong>Course Code:</strong> {course.courseCode}</p>
                                <p><strong>Description:</strong> {course.description}</p>
                                <p><strong>Average Rating:</strong>{course.rating}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No courses found for "{query}".</p>
                )}
            </div>
            <div>
                <button onClick={() => navigate('/')}>Home Page</button>
            </div>
        </div>
    );
};

export default CourseResults;
