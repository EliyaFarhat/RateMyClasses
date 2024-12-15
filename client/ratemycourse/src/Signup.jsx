import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert("Signup successful!");
            navigate('/login');
        } catch (error) {
            alert("Signup failed: " + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
