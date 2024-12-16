import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // To display success or error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users', {
                username: name,
                email,
                password,
            });
            console.log(response.data); // Log the server's response
            setMessage('Signup successful!'); // Update success message
        } catch (error) {
            console.error(error.response?.data?.message || error.message); // Log the error
            setMessage('Signup failed. Please try again.'); // Update error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input
                name="username"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update state
                required
            />
            <input
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state
                required
            />
            <button type="submit">Signup</button>
            {message && <p>{message}</p>} {/* Display success or error message */}
        </form>
    );
};

export default Signup;
