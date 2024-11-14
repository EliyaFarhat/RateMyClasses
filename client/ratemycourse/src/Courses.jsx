import React, { useState } from 'react';
import axios from 'axios';
import './CSS Files/Courses.css'
import { createCourse } from '../../../server/controllers/courses';

const Courses = () => {
    const [query, setQuery] = useState(''); //expects a string
    const [courses, setCourses] = useState([]); //expects an array

    const handleSearch = async (e) => { //e = event object
        e.preventDefault();
        console.log('Search submitted with query:', query); // Track the query value
        try {
            const response = await axios.get(`/courses/search?query=${query}`);
            setCourses(response.data); //setcourses will hold the data of whatever we get from the server
            console.log(setCourses)
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
                                <h3>{course.courseName}</h3>
                                <p>{course.description}</p>
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
