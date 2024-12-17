import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS Files/Navbar.css';
import { useAuth } from './AuthContext'; // Import useAuth hook

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
        <Link to="/FAQ">FAQ</Link>
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
          <span className="nav-username">Hello, {username || 'Guest'}</span>

            <button onClick={handleLogout} className="nav-link">
              Log Out
            </button>
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

export default Navbar;
