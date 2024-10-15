import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../reduxStore/authSlice';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Google token:', credentialResponse.credential);
    try {
      const response = await axios.post('http://localhost:3001/api/shop/auth/google', {
        idToken: credentialResponse.credential,
      });

      console.log('Response:', response.data);

      localStorage.setItem('token', response.data.token);
      dispatch(
        setLogin({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="google-login">
        {user ? (
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <img src={user.picture} alt="Profile" />
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
