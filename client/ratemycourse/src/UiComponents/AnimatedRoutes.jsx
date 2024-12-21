import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Correct imports
import Courses from '../Courses';
import CourseResults from '../CourseResults'; 
import Signup from '../Signup';
import Login from '../Login';
import AddReview from '../ReviewPage';  
import CourseDetail from '../CourseDetails';
import Layout from '../Layout'; // Import the new Layout component
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
            <Route path="/" element={<Courses />} /> {/* Home page with courses */}
            <Route path="courses/results/:query" element={<CourseResults />} /> {/* Search results */}
            <Route path="signup" element={<Signup />} /> {/* Signup page */}
            <Route path="login" element={<Login />} /> {/* Login page */}
            <Route path="courses/review/:courseId" element={<AddReview />} /> {/* Add review page */}
            <Route path="courses/:courseId" element={<CourseDetail />} /> {/* Course details */}
            </Route>
        </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
