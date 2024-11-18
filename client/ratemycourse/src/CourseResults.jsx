import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Access route parameters
import axios from 'axios';

const CourseResults = () => {
    const { query } = useParams(); // Get the query from the URL
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No courses found for "{query}".</p>
                )}
            </div>
        </div>
    );
};

export default CourseResults;