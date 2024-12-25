import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './CSS Files/App.css';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet /> 
      </div>
    </>
  );
};

export default Layout;