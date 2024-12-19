// CourseDetail.jsx
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
                    <h2>{course.courseCode}</h2>
                    <p>{course.description}</p>
                    <p><strong>Prerequisite:</strong> {course.prerequisite}</p>
                    <p><strong>Average Rating:</strong> {course.rating || "N/A"}</p>
                    {/* More course details */}
                </div>
            ) : (
                <p>Course not found.</p>
            )}
        </div>
    );
};

export default CourseDetail;
