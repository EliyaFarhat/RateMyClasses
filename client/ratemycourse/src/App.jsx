import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import the new Layout component
import Courses from './Courses';
import CourseResults from './CourseResults'; // Import the CourseResults component
import Signup from './Signup';
import Login from './Login';
import AddReview from './ReviewPage';  // Adjust path as necessary
import CourseDetail from './CourseDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
  
          <Route index element={<Courses />} /> {/* This is the home page with courses */}
          <Route path="courses/results/:query" element={<CourseResults />} /> {/* Search results page */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses/review/:courseId" element={<AddReview />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />


        </Route>
      </Routes>
    </Router>
  );
};

export default App;