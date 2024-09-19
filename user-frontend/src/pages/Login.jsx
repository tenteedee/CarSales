import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { setLogin } from '../reduxStore/authSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        e.preventDefault();
        try {
            if (!emailRegex.test(email)) {
                setError('Invalid Email Address');
                setShowError(true);
                return false;
            } else if (
                !password ||
                password === null ||
                password === undefined
            ) {
                setError('Invalid Password!');
                setShowError(true);
                return false;
            } else {
                setIsLoading(true);
                axios
                    .post('/auth/login', {
                        email,
                        password,
                    })
                    .then((response) => {
                        dispatch(
                            setLogin({
                                user: response.data.user,
                                token: response.data.token,
                            })
                        );
                        navigate('/');
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

    return <>đây là trang login</>;
}

export default Login;
