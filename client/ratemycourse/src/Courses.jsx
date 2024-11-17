import React, { useState } from 'react';
import axios from 'axios';
import './CSS Files/Courses.css';

const Courses = () => {
    const [query, setQuery] = useState(''); // Input from user
    const [courses, setCourses] = useState([]); // Holds the data from the backend

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(query); // Track the query value
        try {
            const response = await axios.get(`http://localhost:5000/courses/search?query=${query}`);
            setCourses(response.data); // Set the courses to the data received from the server
        } catch (error) {
            console.error('Error searching courses:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a course"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

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
                    <p>Examples: CPS420, MTH110, RTA928</p>
                )}
            </div>
        </div>
    );
};

export default Courses;
