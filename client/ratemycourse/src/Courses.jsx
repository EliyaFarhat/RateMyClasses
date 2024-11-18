import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CSS Files/Courses.css';

const Courses = () => {
    const [query, setQuery] = useState(''); // Input from user
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/courses/results/${query}`); // Redirect to results page with query
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
                <p>Examples: CPS420, MTH110, RTA928</p>
            </div>
        </div>
    );
};

export default Courses;