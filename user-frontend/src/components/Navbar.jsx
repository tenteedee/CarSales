const Navbar = () => {
    return (
        <>
            <nav className="b-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 col-xs-4">
                            <div
                                className="b-nav__logo wow slideInLeft"
                                data-wow-delay="0.3s"
                            >
                                <h3>
                                    <a href="/">
                                        Auto<span>Club</span>
                                    </a>
                                </h3>
                                <h2>
                                    <a href="/">AUTO DEALER TEMPLATE</a>
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
                                        data-toggle="collapse"
                                        data-target="#nav"
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
                                    className="collapse navbar-collapse navbar-main-slide"
                                    id="nav"
                                >
                                    <ul className="navbar-nav-menu">
                                        <li className="dropdown">
                                            <a
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                href="home.html"
                                            >
                                                Home{' '}
                                                <span className="fa fa-caret-down"></span>
                                            </a>
                                            <ul className="dropdown-menu h-nav">
                                                <li>
                                                    <a href="home.html">
                                                        Home Page 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="home-2.html">
                                                        Home Page 2
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <a
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                href="#"
                                            >
                                                Grid{' '}
                                                <span className="fa fa-caret-down"></span>
                                            </a>
                                            <ul className="dropdown-menu h-nav">
                                                <li>
                                                    <a href="listings.html">
                                                        listing 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="listingsTwo.html">
                                                        listing 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="listTable.html">
                                                        listing 3
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="listTableTwo.html">
                                                        listing 4
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="compare.html">compare</a>
                                        </li>
                                        <li>
                                            <a href="about.html">About</a>
                                        </li>
                                        <li>
                                            <a href="article.html">Services</a>
                                        </li>
                                        <li className="dropdown">
                                            <a
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                href="#"
                                            >
                                                Blog{' '}
                                                <span className="fa fa-caret-down"></span>
                                            </a>
                                            <ul className="dropdown-menu h-nav">
                                                <li>
                                                    <a href="blog.html">
                                                        Blog 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blogTwo.html">
                                                        Blog 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="404.html">
                                                        Page 404
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="submit1.html">Shop</a>
                                        </li>
                                        <li>
                                            <a href="contacts.html">Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
