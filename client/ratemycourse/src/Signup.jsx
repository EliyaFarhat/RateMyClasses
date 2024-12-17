import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form reload
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username, // Key matches backend's `req.body.username`
                password, // Key matches backend's `req.body.password`
            });

            // Store JWT token
            const { token } = response.data;
            localStorage.setItem('token', token);

            // Set global login state
            login(username);

            // Redirect on success
            navigate('/');
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Login failed. Check your credentials.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </form>
    );
};

export default Login;
