import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchConfig } from './reduxStore/configSlice';

function App() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch config from backend when the component mounts
        dispatch(fetchConfig());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={!token ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/signup"
                    element={!token ? <Signup /> : <Navigate to="/" />}
                />
                {/* <Route path="/job/:id" element={!token ? <Navigate to='/login' /> : <DetailJob />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl">Page Not Found</h2>
        </div>
    );
};

export default App;
