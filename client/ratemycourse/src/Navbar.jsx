import { useState } from 'react'
import './CSS Files/Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); //manages true or false
  }

  return (
    <nav className="navbar">
      <div className={'nav-left'}>
        <a href="#home">Icon One</a>
        <a href="#about">Icon Two</a>
      </div>

      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}> 
        <button><a href="#Login">Login</a></button>
        <button><a href="#SignUp">Sign Up</a></button>
      </div>
    </nav>
  )
}

export default Navbar