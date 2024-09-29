import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/Profile/Profile';
import CarDetail from './pages/CarDetail/CarDetail';

function App() {
    const token = useSelector((state) => state.auth.token);

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
                    path="/register"
                    element={!token ? <Register /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile"
                    element={token ? <UserProfile /> : <Navigate to="/" />}
                />
                <Route path="/car/detail/:id" element={<CarDetail />} />
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
