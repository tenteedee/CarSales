import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../../reduxStore/authSlice';
import { useDispatch } from 'react-redux';
import axios from '../../axios';
import './auth.css';
//a@gmail.com.' or 1  = 1
function Login() {
    const BACKEND_URL = 'http://localhost:3001/api/shop';

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
            const response = await axios.post('auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            dispatch(
                setLogin({
                    user: response.data.user,
                    token: response.data.token,
                })
            );
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                if (validationErrors.password) {
                    setError(validationErrors.password);
                }
                if (validationErrors.email) {
                    setError(validationErrors.email);
                }
            } else {
                setError(error.response?.data.error || 'Something went wrong');
            }
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${BACKEND_URL}/auth/google`;
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login to Your Account</h2>

                {showError && <div className="error-message">{error}</div>}

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

                <button
                    onClick={handleGoogleLogin}
                    className="google-login-button"
                >
                    Login with Google
                </button>

                <div className="redirect">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="register-link">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
