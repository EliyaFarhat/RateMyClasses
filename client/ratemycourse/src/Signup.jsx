import React, { useState } from 'react';
import axios from 'axios';
import '../src/CSS Files/SignUp.css'; // Import the CSS file
import {useNavigate} from "react-router-dom"
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('hhttps://ratemyclasses-3.onrender.com/users', {
                username: name,
                email,
                password,
            });
            setMessage('Signup successful!');
            setTimeout(() => {
                navigate("/login");
            }, 1000); 
   
        } catch (err) {
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Signup</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit"

                
                
                >Signup</button>
                {message && <p style={{ color: "#6df53b" }}>{message}</p>}

            </form>
        </div>
    );
};

export default Signup;
