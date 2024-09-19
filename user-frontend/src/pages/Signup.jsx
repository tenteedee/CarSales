import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';

function Signup() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^[^\s]{6,}$/;

        e.preventDefault();
        try {
            if (!stringRegex.test(fullname)) {
                setError('Invalid Fullname');
                setShowError(true);
                return false;
            } else if (!emailRegex.test(email)) {
                setError('Invalid Email Address');
                setShowError(true);
                return false;
            } else if (!passwordRegex.test(password)) {
                setError('Invalid Password! Make a strong password');
                setShowError(true);
                return false;
            } else if (password !== confirmPassword) {
                setError('Confirm your password');
                setShowError(true);
                return false;
            } else {
                setIsLoading(true);
                axios
                    .post('/auth/register', {
                        fullname,
                        email,
                        password,
                    })
                    .then((response) => {
                        navigate('/login');
                        alert('Successfully created user');
                    })
                    .catch((error) => {
                        setError(error.response.data.error);
                        setShowError(true);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        } catch (err) {
            console.error(err);
            setShowError(true);
            setError('Something went wrong');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            showError && setShowError(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [showError]);

    return <>đây là trang đăng kí</>;
}

export default Signup;
