import React, { useState } from 'react';
import axios from 'axios';
import '../src/CSS Files/SignUp.css'; // Import the CSS file

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:5000/users', {
                username: name,
                email,
                password,
            });
            setMessage('Signup successful!');
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
                <button type="submit">Signup</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Signup;
