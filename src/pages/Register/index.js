import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmation: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const validationErrors = {};

        if (!formData.email || !formData.email.match(/^\S+@\S+\.\S+$/)) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password || formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        if (formData.password !== formData.confirmation) {
            validationErrors.confirmation = "Passwords do not match.";
        }

        const hasErrors = Object.keys(validationErrors).length > 0;

        if (hasErrors) {
            setErrors(validationErrors);
        }

        return !hasErrors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {errors.email && <p className={styles.error}>{errors.email}</p>}

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                />

                {errors.password && <p className={styles.error}>{errors.password}</p>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                />

                {errors.confirmation && (
                    <p className={styles.error}>{errors.confirmation}</p>
                )}

                <label htmlFor="confirmation">Confirmation:</label>
                <input
                    type="password"
                    name="confirmation"
                    value={formData.confirmation}
                    onChange={handleChange}
                    className={styles.input}
                />

                <button type="submit" className={styles.submit}>
                    Register
          </button>
            </form>
            <p className={styles.loginLink}>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;
