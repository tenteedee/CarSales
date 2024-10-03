import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './pages/Profile/Profile';
import CarDetail from './pages/CarDetail/CarDetail';
import TestDrive from './pages/TestDrive/TestDrive';
import Contacts from './pages/Contacts/Contacts';

function App() {
    const token = useSelector((state) => state.auth.token);
    const location = useLocation();

    // Các đường dẫn muốn ẩn Navbar
    const hideNavbarPaths = ['/login', '/register'];

    return (
        <div>
            <Header />
            {/* Chỉ hiển thị Navbar nếu không phải trang login/register */}
            {!hideNavbarPaths.includes(location.pathname) && (
                <>
                    <Navbar />
                </>
            )}

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
                <Route path="/test-drive" element={<TestDrive />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/404" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="not-found status">404</h1>
            <h2 className="not-found error">Page Not Found</h2>
        </div>
    );
};

export default App;
