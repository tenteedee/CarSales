import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../../reduxStore/authSlice';
import { useDispatch } from 'react-redux';
import axios from '../../axios';
import "./auth.css"
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setError('Invalid Email Address');
            setShowError(true);
            return;
        }

        if (!password) {
            setError('Password is required');
            setShowError(true);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('auth/login', { email, password });
            dispatch(
                setLogin({
                    user: response.data.user,
                    token: response.data.token,
                })
            );
            navigate('/');
        } catch (error) {
            // Check if there are validation errors in the response
            if (error.response && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                // Handle password validation error, for example:
                if (validationErrors.password) {
                    setError(validationErrors.password); // Get the first error for password
                }
                if (validationErrors.email) {
                    setError(validationErrors.email); // Get the first error for password
                }
            } else {
                setError(error.response?.data.error || 'Something went wrong');
            }
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login to Your Account</h2>

                {showError && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="signup-redirect">
                    <span>Don't have an account? </span>
                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
