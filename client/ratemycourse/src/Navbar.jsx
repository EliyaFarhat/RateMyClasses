import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './CSS Files/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Manages true or false
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="">Icon One</a>
        <a href="">FAQ</a>
      </div>

      {/* Burger Menu for small screens */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <button>
          <Link to="/login" className="nav-link">Login</Link>
        </button>
        <button>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
