import { useState } from 'react'
import './CSS Files/App.css'
import Navbar from './Navbar';
import Course from './Courses';

//app jsx serves to keep the format of what will appear on the webpage 
//we will use call all references here
function App() {



  return (
    <>
      <Navbar />
      <Course/>
   
    </>
  )
}

export default App
