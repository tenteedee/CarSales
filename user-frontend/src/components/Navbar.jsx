import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the hook

const Navbar = () => {
    const { t } = useTranslation(); // Call the hook to get the t function
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        home: false,
        buyCar: false,
        services: false,
    });

    // Toggle Navbar for mobile view
    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Handle mouse enter and leave for dropdown
    const handleMouseEnter = (menu) => {
        setIsDropdownOpen((prevState) => ({ ...prevState, [menu]: true }));
    };

    const handleMouseLeave = (menu) => {
        setIsDropdownOpen((prevState) => ({ ...prevState, [menu]: false }));
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
                            <Link to="/">
                                <h3>
                                    <a href="/">
                                        Auto<span>Club</span>
                                    </a>
                                </h3>
                                <h2>
                                    <a href="/">AUTO DEALER TEMPLATE</a>
                                </h2>
                            </Link>
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
                                    <li>
                                        <Link to="/">{t('TRANG CHỦ')}</Link>
                                    </li>
                                    <li
                                        className={`dropdown ${
                                            isDropdownOpen.buyCar ? 'open' : ''
                                        }`}
                                        onMouseEnter={() =>
                                            handleMouseEnter('buyCar')
                                        }
                                        onMouseLeave={() =>
                                            handleMouseLeave('buyCar')
                                        }
                                    >
                                        <Link
                                            className="dropdown-toggle"
                                            to="#"
                                        >
                                            {t('MUA XE')}{' '}
                                            <span className="fa fa-caret-down"></span>
                                        </Link>
                                        {isDropdownOpen.buyCar && (
                                            <ul className="dropdown-menu h-nav">
                                                {/* <li>
                          <Link to="/cars">{t('DANH SÁCH XE')}</Link>
                        </li> */}
                                                <li>
                                                    <Link to="/car-loan">
                                                        {t('ƯỚC TÍNH VAY')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/insurance">
                                                        {t('GÓI BẢO HIỂM')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li
                                        className={`dropdown ${
                                            isDropdownOpen.services
                                                ? 'open'
                                                : ''
                                        }`}
                                        onMouseEnter={() =>
                                            handleMouseEnter('services')
                                        }
                                        onMouseLeave={() =>
                                            handleMouseLeave('services')
                                        }
                                    >
                                        <Link
                                            className="dropdown-toggle"
                                            to="#"
                                        >
                                            {t('DỊCH VỤ')}{' '}
                                            <span className="fa fa-caret-down"></span>
                                        </Link>
                                        {isDropdownOpen.services && (
                                            <ul className="dropdown-menu h-nav">
                                                <li>
                                                    <Link to="/test-drive/history">
                                                        {t('LỊCH SỬ LÁI THỬ')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <Link to="/news">{t('TIN TỨC')}</Link>
                                    </li>
                                    <li>
                                        <Link to="/contacts">
                                            {t('LIÊN HỆ')}
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
