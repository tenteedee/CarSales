import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConfig } from '../reduxStore/configSlice';
import Loading from './Loading';
import { setLogin } from '../reduxStore/authSlice';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Header = () => {
    const config = useSelector((state) => state.config.config);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Add loading state
    const [isOpen, setIsOpen] = useState(false); // Add state for dropdown open/close
    const { t, i18n } = useTranslation(); // Correctly use useTranslation

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang); // No type declaration needed in JSX
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchConfig());
            setLoading(false); // Stop loading when done
        };
        fetchData();
    }, [dispatch]);

    const logOut = async () => {
        localStorage.removeItem('token');
        dispatch(
            setLogin({
                user: {},
                token: '',
            }),
        );
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle dropdown state
    };

    // Show loading screen if still loading
    if (loading) {
        return <Loading />;
    }

    return (
        <header className="b-topBar">
            <div className="container wow slideInDown" data-wow-delay="0.7s">
                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="col-md-3 col-xs-6">
                        <div className="b-topBar__addr">
                            <span className="fa fa-map-marker"></span>
                            {config?.address}
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-6">
                        <div className="b-topBar__tel">
                            <span className="fa fa-phone"></span>
                            {config?.phone}
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-6">
                        {!token ? (
                            <nav className="b-topBar__nav">
                                <ul style={{ display: 'flex', gap: '10px' }}>
                                    <li><Link to={'/login'}>Login</Link></li>
                                    <li><Link to={'/register'}>Register</Link></li>
                                    <li><Link to={'/cart'}>Cart</Link></li>
                                </ul>
                            </nav>
                        ) : (
                            <nav className="b-topBar__nav">
                                <ul style={{ display: 'flex', gap: '10px' }}>
                                    <li>
                                        <Link onClick={logOut} to={'/'}>{t('LOGOUT')}</Link>
                                    </li>
                                    <li>
                                        <Link to={'/profile'}>{t('PROFILE')}</Link>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                    <div className="col-md-2 col-xs-6">
                        <div className="b-topBar__lang">
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">NGÔN NGỮ</a>
                                <a className="m-langLink dropdown-toggle" data-toggle="dropdown" href="#">
                                    <span className="b-topBar__lang-flag m-en"></span>VN<span className="fa fa-caret-down"></span>
                                </a>
                                <ul className="dropdown-menu h-lang">
                                    <li>
                                        <a className="m-langLink dropdown-toggle" data-toggle="dropdown" href="#">
                                            <span className="b-topBar__lang-flag m-en"></span>VN
                                        </a>
                                    </li>
                                    <li>
                                        <a className="m-langLink dropdown-toggle" data-toggle="dropdown" href="#">
                                            <span className="b-topBar__lang-flag m-es"></span>EN
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>


    );
};

export default Header;
