const Footer = () => {
    return (
        <>
            <footer className="b-footer">
                <a id="to-top" href="#this-is-top">
                    <i className="fa fa-chevron-up"></i>
                </a>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4">
                            <div
                                className="b-footer__company wow slideInLeft"
                                data-wow-delay="0.3s"
                            >
                                <div className="b-nav__logo">
                                    <h3>
                                        <a href="home.html">
                                            Auto<span>Club</span>
                                        </a>
                                    </h3>
                                </div>
                                <p>&copy; 2024 By G4</p>
                            </div>
                        </div>
                        <div className="col-xs-8">
                            <div
                                className="b-footer__content wow slideInRight"
                                data-wow-delay="0.3s"
                            >
                                <div className="b-footer__content-social">
                                    <a href="#">
                                        <span className="fa fa-facebook-square"></span>
                                    </a>
                                    <a href="#">
                                        <span className="fa fa-twitter-square"></span>
                                    </a>
                                    <a href="#">
                                        <span className="fa fa-google-plus-square"></span>
                                    </a>
                                    <a href="#">
                                        <span className="fa fa-instagram"></span>
                                    </a>
                                    <a href="#">
                                        <span className="fa fa-youtube-square"></span>
                                    </a>
                                    <a href="#">
                                        <span className="fa fa-skype"></span>
                                    </a>
                                </div>
                                <nav className="b-footer__content-nav">
                                    <ul>
                                        <li>
                                            <a href="home.html">Home</a>
                                        </li>
                                        <li>
                                            <a href="404.html">Pages</a>
                                        </li>
                                        <li>
                                            <a href="listings.html">
                                                Inventory
                                            </a>
                                        </li>
                                        <li>
                                            <a href="about.html">About</a>
                                        </li>
                                        <li>
                                            <a href="404.html">Services</a>
                                        </li>
                                        <li>
                                            <a href="blog.html">Blog</a>
                                        </li>
                                        <li>
                                            <a href="listTable.html">Shop</a>
                                        </li>
                                        <li>
                                            <a href="contacts.html">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;
