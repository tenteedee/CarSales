import React from 'react';
const Header = () => {
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
                        <div className="col-md-4 col-xs-6">
                            <nav className="b-topBar__nav">
                                <ul>
                                    <li>
                                        <a href="#">Cart</a>
                                    </li>
                                    <li>
                                        <a href="#">Register</a>
                                    </li>
                                    <li>
                                        <a href="#">Sign in</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-2 col-xs-6">
                            <div className="b-topBar__lang">
                                <div className="dropdown">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                    >
                                        Language
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
