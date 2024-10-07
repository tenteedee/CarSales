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
                                <h3><a href="home-2.html">Auto<span>Club</span></a></h3>
                                <h2><a href="home-2.html">AUTO DEALER TEMPLATE</a></h2>
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
                                className={`collapse navbar-collapse navbar-main-slide ${isNavbarOpen ? 'in' : ''}`}
                                id="nav"
                            >
                                <ul className="navbar-nav-menu">
                                    <li>
                                        <Link to="/">{t('TRANG CHỦ')}</Link>
                                    </li>
                                    <li
                                        className={`dropdown ${isDropdownOpen.buyCar ? 'open' : ''}`}
                                        onMouseEnter={() => handleMouseEnter('buyCar')}
                                        onMouseLeave={() => handleMouseLeave('buyCar')}
                                    >
                                        <Link className="dropdown-toggle" to="#">
                                            {t('MUA XE')} <span className="fa fa-caret-down"></span>
                                        </Link>
                                        {isDropdownOpen.buyCar && (
                                            <ul className="dropdown-menu h-nav">
                                                <li>
                                                    <Link to="/listings">{t('TRẢ GÓP')}</Link>
                                                </li>
                                                <li>
                                                    <Link to="/car-loan">{t('DỰ TOÁN CHI PHÍ')}</Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <Link to="/about">{t('GIỚI THIỆU')}</Link>
                                    </li>
                                    <li>
                                        <Link to="/article">{t('KHUYẾN MÃI')}</Link>
                                    </li>
                                    <li
                                        className={`dropdown ${isDropdownOpen.services ? 'open' : ''}`}
                                        onMouseEnter={() => handleMouseEnter('services')}
                                        onMouseLeave={() => handleMouseLeave('services')}
                                    >
                                        <Link className="dropdown-toggle" to="#">
                                            {t('DỊCH VỤ')} <span className="fa fa-caret-down"></span>
                                        </Link>
                                        {isDropdownOpen.services && (
                                            <ul className="dropdown-menu h-nav">
                                                <li>
                                                    <Link to="/blog">{t('BẢO HÀNH')}</Link>
                                                </li>
                                                <li>
                                                    <Link to="/blogTwo">{t('PHỤ TÙNG VÀ PHỤ KIỆN')}</Link>
                                                </li>
                                                <li>
                                                    <Link to="/404">{t('ĐĂNG KÝ LÁI THỬ')}</Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <Link to="/submit1">{t('TIN TỨC')}</Link>
                                    </li>
                                    <li>
                                        <Link to="/contacts">{t('LIÊN HỆ')}</Link>
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
