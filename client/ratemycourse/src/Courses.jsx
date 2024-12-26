import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // For making HTTP requests
import './CSS Files/Courses.css';

const Courses = () => {
    const [query, setQuery] = useState(''); // Input from user
    const [suggestions, setSuggestions] = useState([]); // Suggestions for dropdown
    const [isDropdownVisible, setDropdownVisible] = useState(false); // Toggle dropdown
    const navigate = useNavigate(); // React Router's hook for navigation

    // Fetch suggestions from the backend
    const fetchSuggestions = async (input) => {
        try {
            const response = await axios.get('https://ratemyclasses.onrender.com/courses/search', {
                params: { query: input }, // Pass the user input as a query parameter
            });
            setSuggestions(response.data); // Update suggestions with the response data
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]); // Clear suggestions on error
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim()) {
            setDropdownVisible(true);
            fetchSuggestions(value); // Fetch suggestions from the backend
        } else {
            setDropdownVisible(false);
            setSuggestions([]); // Clear suggestions when input is empty
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/courses/results/${query}`); // Redirect to results page with query
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.courseName); // Use the course name from the suggestion
        setDropdownVisible(false); // Hide dropdown after selection
        navigate(`/courses/results/${suggestion.courseCode}`); // Navigate to the selected course
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a course"
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            {isDropdownVisible && (
    <ul className="dropdown">
        {suggestions.length > 0 ? (
            suggestions.slice(0, 5).map((suggestion, index) => (
                <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item" 
                >
                    <div className="course-code">{suggestion.courseCode}</div>
                    <div className="course-name">{suggestion.courseName}</div>
                    <div className="course-details">{suggestion.weeklyContact}</div>
                </li>
            ))
        ) : (
            <li className="no-results">No results found</li>
        )}
    </ul>
)}

            <div>
                <p>Examples: CPS 420, MTH 110, RTA 928</p>
            </div>
        </div>
    );
};

export default Courses;
