import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS Files/Navbar.css';
import { useAuth } from './AuthContext'; // Import useAuth hook
import transition from "../src/UiComponents/Transition";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, username, logout } = useAuth(); // Destructure username
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <a href="https://github.com/EliyaFarhat/RateMyClasses" target="_blank" rel="noopener noreferrer">
    GitHub
  </a>
      </div>

      {/* Burger Menu for small screens */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        {isLoggedIn ? (
          <>
          <div className="nav-user-section">
  <span className="nav-username">Hello, {username}</span>
  <button onClick={handleLogout} className="nav-link nav-logout-button">
    Log Out
  </button>
</div>

          </>
        ) : (
          <>
            <button>
              <Link to="/login" className="nav-link">Login</Link>
            </button>
            <button>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default transition(Navbar);
