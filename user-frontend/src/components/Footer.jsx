const Footer = () => {
    return (
        <>
            <footer class="b-footer">
                <a id="to-top" href="#this-is-top">
                    <i class="fa fa-chevron-up"></i>
                </a>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-4">
                            <div
                                class="b-footer__company wow slideInLeft"
                                data-wow-delay="0.3s"
                            >
                                <div class="b-nav__logo">
                                    <h3>
                                        <a href="home.html">
                                            Auto<span>Club</span>
                                        </a>
                                    </h3>
                                </div>
                                <p>
                                    &copy; 2015 Designed by Templines &amp;
                                    Powered by WordPress.
                                </p>
                            </div>
                        </div>
                        <div class="col-xs-8">
                            <div
                                class="b-footer__content wow slideInRight"
                                data-wow-delay="0.3s"
                            >
                                <div class="b-footer__content-social">
                                    <a href="#">
                                        <span class="fa fa-facebook-square"></span>
                                    </a>
                                    <a href="#">
                                        <span class="fa fa-twitter-square"></span>
                                    </a>
                                    <a href="#">
                                        <span class="fa fa-google-plus-square"></span>
                                    </a>
                                    <a href="#">
                                        <span class="fa fa-instagram"></span>
                                    </a>
                                    <a href="#">
                                        <span class="fa fa-youtube-square"></span>
                                    </a>
                                    <a href="#">
                                        <span class="fa fa-skype"></span>
                                    </a>
                                </div>
                                <nav class="b-footer__content-nav">
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
