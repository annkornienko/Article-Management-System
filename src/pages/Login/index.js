import React, { useState } from "react";
import styles from "../Register/Register.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.email || !formData.email.match(/^\S+@\S+\.\S+$/)) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password || formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            localStorage.setItem("user", formData.email);
            navigate("/")
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form} >
                {errors.email && <div className={styles.error}>{errors.email}</div>}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                />

                {errors.password && <div className={styles.error}>{errors.password}</div>}
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.submit}>Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default Login;
