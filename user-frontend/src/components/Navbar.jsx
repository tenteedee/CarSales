import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle Navbar for mobile view
    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Handle mouse enter and leave for dropdown
    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className="b-nav">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 col-xs-4">
                        <div
                            className="b-nav__logo wow slideInLeft"
                            data-wow-delay="0.3s"
                        >
                            <h3>
                                <Link to="/">
                                    Auto<span>Club</span>
                                </Link>
                            </h3>
                            <h2>
                                <Link to="/">AUTO DEALER TEMPLATE</Link>
                            </h2>
                        </div>
                    </div>
                    <div className="col-sm-9 col-xs-8">
                        <div
                            className="b-nav__list wow slideInRight"
                            data-wow-delay="0.3s"
                        >
                            <div className="navbar-header">
                                <button
                                    type="button"
                                    className="navbar-toggle"
                                    onClick={toggleNavbar}
                                >
                                    <span className="sr-only">
                                        Toggle navigation
                                    </span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div
                                className={`collapse navbar-collapse navbar-main-slide ${
                                    isNavbarOpen ? 'in' : ''
                                }`}
                                id="nav"
                            >
                                <ul className="navbar-nav-menu">
                                    <li
                                        className={`dropdown ${
                                            isDropdownOpen ? 'open' : ''
                                        }`}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Link
                                            className="dropdown-toggle"
                                            to="/"
                                        >
                                            Home{' '}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
