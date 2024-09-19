import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const config = useSelector((state) => state.config.config);
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
                                {config?.address}
                            </div>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <div className="b-topBar__tel">
                                <span className="fa fa-phone"></span>
                                {config?.phone}
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
