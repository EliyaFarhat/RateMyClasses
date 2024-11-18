import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import the new Layout component
import Courses from './Courses';
import CourseResults from './CourseResults'; // Import the CourseResults component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes under Layout */}
          <Route index element={<Courses />} /> {/* This is the home page with courses */}
          <Route path="courses/results/:query" element={<CourseResults />} /> {/* Search results page */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;