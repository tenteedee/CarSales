import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const token = useSelector((state) => state.auth.token);
    return (
        <>
            <header className="b-topBar">
                <div
                    className="container wow slideInDown"
                    data-wow-delay="0.7s"
                >
                    <div className="row">
                        <div className="col-md-4 col-xs-6">
                            <div className="b-topBar__addr">
                                <span className="fa fa-map-marker"></span>
                                202 W 7TH ST, LOS ANGELES, CA 90014
                            </div>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <div className="b-topBar__tel">
                                <span className="fa fa-phone"></span>
                                1-800- 624-5462
                            </div>
                        </div>
                        <div className="col-md-2 col-xs-6"></div>
                        {!token ? (
                            <>
                                <div className="col-md-4 col-xs-6">
                                    <nav className="b-topBar__nav">
                                        <ul>
                                            <li>
                                                <Link to={'/register'}>
                                                    Register
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/login'}>Login</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-md-4 col-xs-6">
                                    <nav className="b-topBar__nav">
                                        <Link to={'/profile'} />
                                    </nav>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
