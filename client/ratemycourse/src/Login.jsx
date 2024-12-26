import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://ratemyclasses.onrender.com/api/login", {
                username,
                password,
            });

            const { token, message } = response.data;

            localStorage.setItem("token", token);
            login(username);

            console.log("Username sent to AuthContext:", username);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Login</h1>
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
    },
    card: {
        width: "400px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#1e1e1e",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
    },
    heading: {
        color: "#fff",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#121212",
        color: "#fff",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#f9e79f",
        color: "#000",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#dbdba4",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "10px",
    },
};

export default Login;
