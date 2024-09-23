import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const config = useSelector((state) => state.config.config);

    //const token = useSelector(state => state.auth.token);
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(
        params.get('description') || ''
    );
    return (
        <div>
            <section className="b-slider">
                <div id="carousel" className="slide carousel carousel-fade">
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="src\assets\media\main-slider\4.jpg" alt="sliderImg" />
                            <div className="container">
                                <div className="carousel-caption b-slider__info">
                                    <h3>Find your dream car</h3>
                                    <h2>MercedesBenz <br />CLS63 AMG</h2>
                                    <p>Model 2015 <span>$214,900</span></p>
                                    <a className="btn m-btn" href="detail.html">see details<span className="fa fa-angle-right"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="/images/4.jpg" alt="sliderImg" />

                            <div className="container">
                                <div className="carousel-caption b-slider__info">
                                    <h3>Find your dream car</h3>
                                    <h2>MercedesBenz <br />CLS63 AMG</h2>
                                    <p>Model 2015 <span>$214,900</span></p>
                                    <a className="btn m-btn" href="detail.html">see details<span className="fa fa-angle-right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control right" href="#carousel" data-slide="next">
                        <span className="fa fa-angle-right m-control-right"></span>
                    </a>
                    <a className="carousel-control left" href="#carousel" data-slide="prev">
                        <span className="fa fa-angle-left m-control-left"></span>
                    </a>
                </div>
            </section>

            <section className="b-search">
                <div className="container">
                    <h1 className="wow zoomInUp" data-wow-delay="0.3s">UNSURE WHICH VEHICLE YOU ARE LOOKING FOR? FIND IT HERE</h1>
                    <div className="b-search__main wow zoomInUp" data-wow-delay="0.3s">
                        <h4>SELECT VEHICLE BODY TYPE</h4>
                        <form action="https://pro-theme.com/html/sokolcov/auto-club/listingsTwo.html" method="POST" className="b-search__main-form">
                            <div className="row">
                                <div className="col-xs-12 col-md-8">
                                    <div className="m-firstSelects">
                                        <div className="col-xs-4">
                                            <select name="select1">
                                                <option value="0" selected="selected">Any Make</option>
                                                <option value="1">Any Make</option>
                                                <option value="2">Any Make</option>
                                                <option value="3">Any Make</option>
                                                <option value="4">Any Make</option>
                                            </select>
                                            <span className="fa fa-caret-down"></span>
                                            <p>MISSING MANUFACTURER?</p>
                                        </div>
                                        <div className="col-xs-4">
                                            <select name="select2">
                                                <option value="0" selected="selected">Any Model</option>
                                                <option value="1">Any Model</option>
                                                <option value="2">Any Model</option>
                                                <option value="3">Any Model</option>
                                            </select>
                                            <span className="fa fa-caret-down"></span>
                                            <p>MISSING MODEL?</p>
                                        </div>
                                        <div className="col-xs-4">
                                            <select name="select3">
                                                <option value="1" selected="selected">Vehicle Status</option>
                                                <option value="2">Vehicle Status 2</option>
                                                <option value="3">Vehicle Status 3</option>
                                                <option value="4">Vehicle Status 4</option>
                                                <option value="5">Vehicle Status 5</option>
                                            </select>
                                            <span className="fa fa-caret-down"></span>
                                            <p>E.G: NEW, USED, CERTIFIED</p>
                                        </div>
                                    </div>
                                    <div className="m-secondSelects">
                                        <div className="col-xs-4">
                                            <select name="select4">
                                                <option value="0" selected="selected">Min Year</option>
                                                <option value="1">Min Year</option>
                                                <option value="2">Min Year</option>
                                                <option value="3">Min Year</option>
                                                <option value="4">Min Year</option>
                                                <option value="5">Min Year</option>
                                            </select>
                                            <span className="fa fa-caret-down"></span>
                                        </div>
                                        <div className="col-xs-4">
                                            <select name="select5">
                                                <option value="0" selected="selected">Max Year</option>
                                                <option value="1">Max Year</option>
                                                <option value="2">Max Year</option>
                                                <option value="3">Max Year</option>
                                                <option value="4">Max Year</option>
                                            </select>
                                            <span className="fa fa-caret-down"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xs-12 text-left s-noPadding">
                                    <div className="b-search__main-form-range">
                                        <label>PRICE RANGE</label>
                                        <div className="slider"></div>
                                        <input type="hidden" name="min" className="j-min" value="" />
                                        <input type="hidden" name="max" className="j-max" value="" />
                                    </div>
                                    <div className="b-search__main-form-submit">
                                        <a href="#">Advanced search</a>
                                        <button type="submit" className="btn m-btn">Search the Vehicle<span className="fa fa-angle-right"></span></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section className="b-world">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-xs-12">
                            <div className="b-world__item wow zoomInLeft" data-wow-delay="0.3s">
                                <img className="img-responsive" src="media/370x200/wolks.jpg" alt="wolks" />
                                <div className="b-world__item-val">
                                    <span className="b-world__item-val-title">WE OFFER</span>
                                </div>
                                <h2>Low Prices, No Haggling</h2>
                                <p>Curabitur libero. Donec facilisis velit eu est. Phasellus cons quat. Aenean vitae quam. Vivamus et nunc. Nunc consequ sem velde metus imperdiet lacinia.</p>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="b-world__item wow zoomInUp" data-wow-delay="0.3s">
                                <img className="img-responsive" src="media/370x200/mazda.jpg" alt="mazda" />
                                <div className="b-world__item-val">
                                    <span className="b-world__item-val-title">WE ARE THE</span>
                                </div>
                                <h2>Largest Car Dealership</h2>
                                <p>Curabitur libero. Donec facilisis velit eu est. Phasellus cons quat. Aenean vitae quam. Vivamus et nunc. Nunc consequ sem velde metus imp erdiet lacinia.</p>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="b-world__item wow zoomInRight" data-wow-delay="0.3s">
                                <img className="img-responsive" src="media/370x200/chevrolet.jpg" alt="chevrolet" />
                                <div className="b-world__item-val">
                                    <span className="b-world__item-val-title">OUR CUSTOMERS GET</span>
                                </div>
                                <h2>Multipoint Safety Check</h2>
                                <p>Curabitur libero. Donec facilisis velit eu est. Phasellus cons quat. Aenean vitae quam. Vivamus et nunc. Nunc consequ sem velde metus imp erdiet lacinia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="b-featured">
                <div className="container">
                    <h2 className="s-title wow zoomInUp" data-wow-delay="0.3s">Featured Vehicles</h2>
                    <div id="carousel-small" className="owl-carousel enable-owl-carousel" data-items="4" data-navigation="true" data-auto-play="true" data-stop-on-hover="true" data-items-desktop="4" data-items-desktop-small="4" data-items-tablet="3" data-items-tablet-small="2">
                        <div>
                            <div className="b-featured__item wow rotateIn" data-wow-delay="0.3s">
                                <a href="detail.html">
                                    <img src="media/186x113/mers.jpg" alt="mers" />
                                    <span className="m-premium">Premium</span>
                                </a>
                                <div className="b-featured__item-price">$184,900</div>
                                <div className="clearfix"></div>
                                <h5><a href="detail.html">MERCEDES-AMG GT / GT S</a></h5>
                                <div className="b-featured__item-count"><span className="fa fa-tachometer"></span>35,000 KM</div>
                                <div className="b-featured__item-links">
                                    <a href="#">Used</a>
                                    <a href="#">2014</a>
                                    <a href="#">Manual</a>
                                    <a href="#">Orange</a>
                                    <a href="#">Petrol</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="b-featured__item wow rotateIn" data-wow-delay="0.3s">
                                <a href="detail.html">
                                    <img src="media/186x113/audi.jpg" alt="audi" />
                                </a>
                                <div className="b-featured__item-price">$95,900</div>
                                <div className="clearfix"></div>
                                <h5><a href="detail.html">AUDI R8 SPYDER V-8</a></h5>
                                <div className="b-featured__item-count"><span className="fa fa-tachometer"></span>0.00 KM</div>
                                <div className="b-featured__item-links">
                                    <a href="#">Used</a>
                                    <a href="#">2015</a>
                                    <a href="#">Manual</a>
                                    <a href="#">Orange</a>
                                    <a href="#">Petrol</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="b-featured__item wow rotateIn" data-wow-delay="0.3s">
                                <a href="detail.html">
                                    <img src="media/186x113/aston.jpg" alt="aston" />
                                    <span className="m-leasing">LEASING AVAILABLE</span>
                                </a>
                                <div className="b-featured__item-price">$101,025</div>
                                <div className="clearfix"></div>
                                <h5><a href="detail.html">ASTON MARTIN VANTAGE</a></h5>
                                <div className="b-featured__item-count"><span className="fa fa-tachometer"></span>35,000 KM</div>
                                <div className="b-featured__item-links">
                                    <a href="#">Used</a>
                                    <a href="#">2014</a>
                                    <a href="#">Manual</a>
                                    <a href="#">Orange</a>
                                    <a href="#">Petrol</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="b-featured__item wow rotateIn" data-wow-delay="0.3s">
                                <a href="detail.html">
                                    <img src="media/186x113/jaguar.jpg" alt="jaguar" />
                                </a>
                                <div className="b-featured__item-price">$130,825</div>
                                <div className="clearfix"></div>
                                <h5><a href="detail.html">JAGUAR F-TYPE R</a></h5>
                                <div className="b-featured__item-count"><span className="fa fa-tachometer"></span>0.00</div>
                                <div className="b-featured__item-links">
                                    <a href="#">Used</a>
                                    <a href="#">2015</a>
                                    <a href="#">Manual</a>
                                    <a href="#">Orange</a>
                                    <a href="#">Petrol</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="b-welcome">
                <div className="container">
                    <div className="row">
                        <div className="b-welcome__services">
                            <div className="col-md-3 col-xs-12">
                                <div className="row">
                                    <div className="col-xs-12 m-padding">
                                        <div className="b-welcome__services-auto wow zoomInLeft" data-wow-delay="0.3s">
                                            <div className="b-welcome__services-img m-auto">
                                                <span className="fa fa-cab"></span>
                                            </div>
                                            <h3>AUTO LOANS</h3>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 text-right visible-md visible-lg">
                                        <div className="m-circle wow slideInRight" data-wow-delay="0.3s">
                                            <span className="b-welcome__services-circle"></span>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 m-padding">
                                        <div className="b-welcome__services-buying wow zoomInLeft" data-wow-delay="0.3s">
                                            <div className="b-welcome__services-img m-buying">
                                                <span className="fa fa-book"></span>
                                            </div>
                                            <h3>Buying guide</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="b-welcome__text wow zoomInUp" data-wow-delay="0.3s">
                                <h2>WORLD'S LEADING CAR DEALER</h2>
                                <h3>WELCOME TO AUTOCLUB</h3>
                                <p>Curabitur libero. Donec facilisis velit eudsl est. Phasellus consequat. Aenean vita quam. Vivamus et nunc. Nunc consequat sem velde metus imperdiet lacinia. Dui estter neque molestie necd dignissim ac hendrerit quis purus. Etiam sit amet vec convallis massa scelerisque mattis. Sed placerat leo nec.</p>
                                <p>Ipsum midne ultrices magn eu tempor quam dolor eustrl sem. Donec quis dolel Donec pede quam placerat alterl tristique faucibus posuere lobortis.</p>
                                <ul>
                                    <li><span className="fa fa-check"></span>Donec facilisis velit eu est phasellus consequat </li>
                                    <li><span className="fa fa-check"></span>Aenean vitae quam. Vivamus et nunc nunc consequat</li>
                                    <li><span className="fa fa-check"></span>Sem vel metus imperdiet lacinia enean </li>
                                    <li><span className="fa fa-check"></span>Dapibus aliquam augue fusce eleifend quisque tels</li>
                                </ul>
                            </div>
                        </div>
                        <div className="b-welcome__services">
                            <div className="col-md-3 col-xs-12">
                                <div className="row">
                                    <div className="col-xs-12 m-padding">
                                        <div className="b-welcome__services-trade wow zoomInRight" data-wow-delay="0.3s">
                                            <div className="b-welcome__services-img m-trade">
                                                <span className="fa fa-male"></span>
                                            </div>
                                            <h3>Trade-Ins</h3>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 text-left visible-md visible-lg">
                                        <div className="m-circle pull-right wow slideInLeft" data-wow-delay="0.3s">
                                            <span className="b-welcome__services-circle m-left"></span>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 m-padding">
                                        <div className="b-welcome__services-support wow zoomInRight" data-wow-delay="0.3s">
                                            <div className="b-welcome__services-img m-support">
                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 612 612">
                                                    <g>
                                                        <path d="M257.938,336.072c0,17.355-14.068,31.424-31.423,31.424c-17.354,0-31.422-14.068-31.422-31.424 c0-17.354,14.068-31.423,31.422-31.423C243.87,304.65,257.938,318.719,257.938,336.072z M385.485,304.65 c-17.354,0-31.423,14.068-31.423,31.424c0,17.354,14.069,31.422,31.423,31.422c17.354,0,31.424-14.068,31.424-31.422 C416.908,318.719,402.84,304.65,385.485,304.65z M612,318.557v59.719c0,29.982-24.305,54.287-54.288,54.287h-39.394 C479.283,540.947,379.604,606.412,306,606.412s-173.283-65.465-212.318-173.85H54.288C24.305,432.562,0,408.258,0,378.275v-59.719 c0-20.631,11.511-38.573,28.46-47.758c0.569-84.785,25.28-151.002,73.553-196.779C149.895,28.613,218.526,5.588,306,5.588 c87.474,0,156.105,23.025,203.987,68.43c48.272,45.777,72.982,111.995,73.553,196.779C600.489,279.983,612,297.925,612,318.557z M497.099,336.271c0-13.969-0.715-27.094-1.771-39.812c-24.093-22.043-67.832-38.769-123.033-44.984 c7.248,8.15,13.509,18.871,17.306,32.983c-33.812-26.637-100.181-20.297-150.382-79.905c-2.878-3.329-5.367-6.51-7.519-9.417 c-0.025-0.035-0.053-0.062-0.078-0.096l0.006,0.002c-8.931-12.078-11.976-19.262-12.146-11.31 c-1.473,68.513-50.034,121.925-103.958,129.46c-0.341,7.535-0.62,15.143-0.62,23.08c0,28.959,4.729,55.352,12.769,79.137 c30.29,36.537,80.312,46.854,124.586,49.59c8.219-13.076,26.66-22.205,48.136-22.205c29.117,0,52.72,16.754,52.72,37.424 c0,20.668-23.604,37.422-52.72,37.422c-22.397,0-41.483-9.93-49.122-23.912c-30.943-1.799-64.959-7.074-95.276-21.391 C198.631,535.18,264.725,568.41,306,568.41C370.859,568.41,497.099,486.475,497.099,336.271z M550.855,264.269 C547.4,116.318,462.951,38.162,306,38.162S64.601,116.318,61.145,264.269h20.887c7.637-49.867,23.778-90.878,48.285-122.412 C169.37,91.609,228.478,66.13,306,66.13c77.522,0,136.63,25.479,175.685,75.727c24.505,31.533,40.647,72.545,48.284,122.412 H550.855L550.855,264.269z" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <h3>24/7 support</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="b-homeAuto">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="b-homeAuto__latest">
                                <h5 className="s-titleBg wow zoomInLeft" data-wow-delay="0.3s">GIVING OUR CUSTOMERS BEST DEALS</h5>
                                <br />
                                <h2 className="s-title wow zoomInLeft" data-wow-delay="0.3s">LATEST VEHICLES ON SALE</h2>
                                <div className="b-auto__main">
                                    <div className="row">
                                        {[
                                            {
                                                src: "media/270x150/nissanGT.jpg",
                                                alt: "nissan",
                                                title: "Nissan GT-R NISMO",
                                                price: "$10,857",
                                                km: "35,000 KM",
                                                year: "2014",
                                                features: ["Used", "2014", "Manual", "Orange", "Petrol"]
                                            },
                                            {
                                                src: "media/270x150/bmw.jpg",
                                                alt: "bmw",
                                                title: "BMW 650i Coupe",
                                                price: "$95,900",
                                                km: "12,000 KM",
                                                year: "2014",
                                                features: ["Used", "2014", "Manual", "Orange", "Petrol"]
                                            },
                                            {
                                                src: "media/270x150/LandRover.jpg",
                                                alt: "LandRover",
                                                title: "Land Rover Range Rover",
                                                price: "$44,380",
                                                km: "35,000 KM",
                                                year: "2014",
                                                features: ["Used", "2014", "Manual", "Orange", "Petrol"]
                                            },
                                            {
                                                src: "media/270x150/corvette.jpg",
                                                alt: "corvette",
                                                title: "Chevrolet Corvette Z06",
                                                price: "$95,900",
                                                km: "12,000 KM",
                                                year: "2014",
                                                features: ["Used", "2014", "Manual", "Orange", "Petrol"]
                                            }
                                        ].map((car, index) => (
                                            <div className="col-md-6 col-sm-12" key={index}>
                                                <div className="b-auto__main-item wow zoomInUp" data-wow-delay="0.3s">
                                                    <img className="img-responsive center-block" src={car.src} alt={car.alt} />
                                                    <div className="b-world__item-val">
                                                        <span className="b-world__item-val-title">REGISTERED <span>{car.year}</span></span>
                                                    </div>
                                                    <h2><a href="detail.html">{car.title}</a></h2>
                                                    <div className="b-auto__main-item-info">
                                                        <span className="m-price">{car.price}</span>
                                                        <span className="m-number">
                                                            <span className="fa fa-tachometer"></span>{car.km}
                                                        </span>
                                                    </div>
                                                    <div className="b-featured__item-links m-auto">
                                                        {car.features.map((feature, idx) => (
                                                            <a href="#" key={idx}>{feature}</a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="b-homeAuto__world">
                                <h5 className="s-titleBg wow zoomInRight" data-wow-delay="0.3s">EVERYTHING YOU NEED TO KNOW</h5>
                                <br />
                                <h2 className="s-title wow zoomInRight" data-wow-delay="0.3s">THE WORLD OF AUTOS</h2>
                                {[
                                    {
                                        title: "2016 Mazda CX-3",
                                        link: "article.html",
                                        img: "media/222x150/mazda2.jpg",
                                        date: "25 MAY 2015",
                                        description: "Curabitur libero. Donec facilisis velit eu est. Phasellus consequat..."
                                    },
                                    {
                                        title: "2015 Chevrolet Corvette Z06 vs. 2015 Nissan GT-R NISMO, 2014 Porsche 911 Turbo S",
                                        link: "article.html",
                                        img: "media/222x150/bmw2.jpg",
                                        date: "25 MAY 2015",
                                        description: "Curabitur libero. Donec facilisis velit eu est. Phasellus consequat..."
                                    }
                                ].map((article, index) => (
                                    <div className="b-homeAuto__world-item wow zoomInUp" data-wow-delay="0.3s" key={index}>
                                        <div className="row">
                                            <div className="col-sm-7 col-xs-12">
                                                <div className="b-homeAuto__world-item-info">
                                                    <h2>
                                                        <a href={article.link}>{article.title}</a>
                                                    </h2>
                                                    <div className="b-world__item-val">
                                                        <div className="b-world__item-val-circles">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span className="m-empty"></span>
                                                        </div>
                                                        <span className="b-world__item-num">4.1</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-5 col-xs-12">
                                                <img src={article.img} className="img-responsive center-block" alt={article.title} />
                                            </div>
                                        </div>
                                        <div className="b-homeAuto__world-item-text">
                                            <span>{article.date}</span>
                                            <p>{article.description}</p>
                                        </div>
                                    </div>
                                ))}
                                <a href="blog.html" className="btn m-btn wow zoomInUp" data-wow-delay="0.3s">VISIT OUR BLOG<span className="fa fa-angle-right"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="b-count">
                <div className="container">
                    <div className="row">
                        <div className="col-md-11 col-xs-12 percent-blocks m-main" data-waypoint-scroll="true">
                            <div className="row">
                                <div className="col-sm-3 col-xs-6">
                                    <div className="b-count__item">
                                        <div className="b-count__item-circle">
                                            <span className="fa fa-car"></span>
                                        </div>
                                        <div className="chart" data-percent="5000">
                                            <h2 className="percent">5000</h2>
                                        </div>
                                        <h5>vehicles in stock</h5>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-6">
                                    <div className="b-count__item">
                                        <div className="b-count__item-circle">
                                            <span className="fa fa-users"></span>
                                        </div>
                                        <div className="chart" data-percent="3100">
                                            <h2 className="percent">3100</h2>
                                        </div>
                                        <h5>HAPPY CUSTOMER REVIEWS</h5>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-6">
                                    <div className="b-count__item">
                                        <div className="b-count__item-circle">
                                            <span className="fa fa-building-o"></span>
                                        </div>
                                        <div className="chart" data-percent="500">
                                            <h2 className="percent">500</h2>
                                        </div>
                                        <h5>DEALER BRANCHES</h5>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-6">
                                    <div className="b-count__item j-lastHome">
                                        <div className="b-count__item-circle">
                                            <span className="fa fa-suitcase"></span>
                                        </div>
                                        <div className="chart" data-percent="54">
                                            <h2 className="percent">54</h2>
                                        </div>
                                        <h5>FREE PARTS GIVEN</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="b-homeReviews">
                <div className="container">
                    <h1 className="s-title wow zoomInUp" data-wow-delay="0.3s">WHAT CUSTOMERS SAYING</h1>
                    <div id="carousel-small-revHome" className="owl-carousel enable-owl-carousel" data-items="2" data-navigation="true" data-auto-play="true" data-stop-on-hover="true" data-items-desktop="2" data-items-desktop-small="2" data-items-tablet="1" data-items-tablet-small="1">
                        <div className="b-homeReviews__main wow slideInUp" data-wow-delay="0.3s">
                            <div className="b-homeReviews__main-body m-jaguarRev">
                                <p>Donec facilisis velit eust. Phasellus cons quat. Aenean letmein vitae quam. Vivamus let nunc. Nunc consequsem velde metus imperdiet lacinia. Nam rutrum congued diam. Vestibulum acda risus eros auctor as morbids sem magna viverra quis consectetuer quis nec magna. Lorem ipsum dolor ametu consectetur adipisicing elit sed do eiusmod.</p>
                            </div>
                            <div className="b-homeReviews__main-person">
                                <div className="b-review__main-person m-personTwo">
                                    <div className="b-review__main-person-inside m-personTwo"></div>
                                </div>
                                <div className="b-homeReviews__main-person-name">
                                    <em>"</em>
                                    <h4>JOHN SMITH</h4>
                                    <p>Customer, Ferrari 488 GTB 2 Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="b-homeReviews__main wow slideInUp" data-wow-delay="0.3s">
                            <div className="b-homeReviews__main-body m-bmw">
                                <p>Donec facilisis velit eust. Phasellus cons quat. Aenean letmein vitae quam. Vivamus let nunc. Nunc consequsem velde metus imperdiet lacinia. Nam rutrum congued diam. Vestibulum acda risus eros auctor as morbids sem magna viverra quis consectetuer quis nec magna. Lorem ipsum dolor ametu consectetur adipisicing elit sed do eiusmod.</p>
                            </div>
                            <div className="b-homeReviews__main-person">
                                <div className="b-review__main-person">
                                    <div className="b-review__main-person-inside m-personThree"></div>
                                </div>
                                <div className="b-homeReviews__main-person-name">
                                    <em>"</em>
                                    <h4>DONALD CAMBELL</h4>
                                    <p>Customer, Ferrari 488 GTB 2 Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="b-homeReviews__main wow slideInUp" data-wow-delay="0.3s">
                            <div className="b-homeReviews__main-body m-jaguarRev">
                                <p>Donec facilisis velit eust. Phasellus cons quat. Aenean letmein vitae quam. Vivamus let nunc. Nunc consequsem velde metus imperdiet lacinia. Nam rutrum congued diam. Vestibulum acda risus eros auctor as morbids sem magna viverra quis consectetuer quis nec magna. Lorem ipsum dolor ametu consectetur adipisicing elit sed do eiusmod.</p>
                            </div>
                            <div className="b-homeReviews__main-person">
                                <div className="b-review__main-person m-personTwo">
                                    <div className="b-review__main-person-inside m-personTwo"></div>
                                </div>
                                <div className="b-homeReviews__main-person-name">
                                    <em>"</em>
                                    <h4>JOHN SMITH</h4>
                                    <p>Customer, Ferrari 488 GTB 2 Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="b-homeReviews__main wow slideInUp" data-wow-delay="0.3s">
                            <div className="b-homeReviews__main-body m-bmw">
                                <p>Donec facilisis velit eust. Phasellus cons quat. Aenean letmein vitae quam. Vivamus let nunc. Nunc consequsem velde metus imperdiet lacinia. Nam rutrum congued diam. Vestibulum acda risus eros auctor as morbids sem magna viverra quis consectetuer quis nec magna. Lorem ipsum dolor ametu consectetur adipisicing elit sed do eiusmod.</p>
                            </div>
                            <div className="b-homeReviews__main-person">
                                <div className="b-review__main-person">
                                    <div className="b-review__main-person-inside m-personThree"></div>
                                </div>
                                <div className="b-homeReviews__main-person-name">
                                    <em>"</em>
                                    <h4>DONALD CAMBELL</h4>
                                    <p>Customer, Ferrari 488 GTB 2 Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="b-asks">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-10 col-sm-offset-1 col-md-offset-0 col-xs-12">
                            <div className="b-asks__first wow zoomInLeft" data-wow-delay="0.3s">
                                <div className="b-asks__first-circle">
                                    <span className="fa fa-search"></span>
                                </div>
                                <div className="b-asks__first-info">
                                    <h2>ARE YOU LOOKING FOR A CAR?</h2>
                                    <p>Search Our Inventory With Thousands Of Cars And More Cars Are Adding On Daily Basis</p>
                                </div>
                                <div className="b-asks__first-arrow">
                                    <a href="listings.html"><span className="fa fa-angle-right"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-10 col-sm-offset-1 col-xs-12 col-md-offset-0">
                            <div className="b-asks__first m-second wow zoomInRight" data-wow-delay="0.3s">
                                <div className="b-asks__first-circle">
                                    <span className="fa fa-usd"></span>
                                </div>
                                <div className="b-asks__first-info">
                                    <h2>DO YOU WANT TO SELL A CAR?</h2>
                                    <p>Search Our Inventory With Thousands Of Cars And More Cars Are Adding On Daily Basis</p>
                                </div>
                                <div className="b-asks__first-arrow">
                                    <a href="listings.html"><span className="fa fa-angle-right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* b-asks */}

            <section className="b-partners">
                <div className="container">
                    <h1 className="s-title wow zoomInUp" data-wow-delay="0.3s">OUR PARTNERS</h1>
                    <div className="">
                        <div className="b-brands__brand wow zoomInLeft" data-wow-delay="0.3s">
                            <img src="media/brands/lydia.png" alt="brand" />
                        </div>
                        <div className="b-brands__brand wow zoomInUp" data-wow-delay="0.3s">
                            <img src="media/brands/decosinto.png" alt="brand" />
                        </div>
                        <div className="b-brands__brand wow zoomInUp" data-wow-delay="0.3s">
                            <img src="media/brands/hospice.png" alt="brand" />
                        </div>
                        <div className="b-brands__brand wow zoomInRight" data-wow-delay="0.3s">
                            <img src="media/brands/aristeia.png" alt="brand" />
                        </div>
                    </div>
                </div>
            </section>
            {/* b-partners */}
            <div className="b-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xs-12">
                            <aside className="b-info__aside wow zoomInLeft" data-wow-delay="0.3s">
                                <article className="b-info__aside-article">
                                    <h3>OPENING HOURS</h3>
                                    <div className="b-info__aside-article-item">
                                        <h6>Sales Department</h6>
                                        <p>Mon-Sat : 8:00am - 5:00pm<span>&middot;</span> Sunday is closed</p>
                                    </div>
                                    <div className="b-info__aside-article-item">
                                        <h6>Service Department</h6>
                                        <p>Mon-Sat : 8:00am - 5:00pm<span>&middot;</span> Sunday is closed</p>
                                    </div>
                                </article>
                                <article className="b-info__aside-article">
                                    <h3>About us</h3>
                                    <p>Vestibulum varius od lio eget consequat blandit, lorem auglue comm lodo nisl non ultricies lectus nibh mas lsa Duis scelerisque aliquet. Ante donec libero pede porttitor dacu msan esct venenatis quis.</p>
                                </article>
                            </aside>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <div className="b-info__latest">
                                <h3 className="wow slideInUp" data-wow-delay="0.3s">LATEST AUTOS</h3>
                                <div className="b-info__latest-article wow slideInUp" data-wow-delay="0.3s">
                                    <div className="b-info__latest-article-photo m-audi"></div>
                                    <div className="b-info__latest-article-info">
                                        <h6><a href="detail.html">MERCEDES-AMG GT S</a></h6>
                                        <div className="b-featured__item-links m-auto">
                                            <a href="#">Used</a>
                                            <a href="#">2014</a>
                                            <a href="#">Manual</a>
                                            <a href="#">Orange</a>
                                            <a href="#">Petrol</a>
                                        </div>
                                        <p><span className="fa fa-tachometer"></span> 35,000 KM</p>
                                    </div>
                                </div>
                                <div className="b-info__latest-article wow slideInUp" data-wow-delay="0.3s">
                                    <div className="b-info__latest-article-photo m-audiSpyder"></div>
                                    <div className="b-info__latest-article-info">
                                        <h6><a href="detail.html">AUDI R8 SPYDER V-8</a></h6>
                                        <div className="b-featured__item-links m-auto">
                                            <a href="#">Used</a>
                                            <a href="#">2014</a>
                                            <a href="#">Manual</a>
                                            <a href="#">Orange</a>
                                            <a href="#">Petrol</a>
                                        </div>
                                        <p><span className="fa fa-tachometer"></span> 35,000 KM</p>
                                    </div>
                                </div>
                                <div className="b-info__latest-article wow slideInUp" data-wow-delay="0.3s">
                                    <div className="b-info__latest-article-photo m-aston"></div>
                                    <div className="b-info__latest-article-info">
                                        <h6><a href="detail.html">ASTON MARTIN VANTAGE</a></h6>
                                        <div className="b-featured__item-links m-auto">
                                            <a href="#">Used</a>
                                            <a href="#">2014</a>
                                            <a href="#">Manual</a>
                                            <a href="#">Orange</a>
                                            <a href="#">Petrol</a>
                                        </div>
                                        <p><span className="fa fa-tachometer"></span> 35,000 KM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <address className="b-info__contacts wow slideInUp" data-wow-delay="0.3s">
                                <p>contact us</p>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-map-marker"></span>
                                    <em>202 W 7th St, Suite 233 Los Angeles,<br />
                                        California 90014 USA</em>
                                </div>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-phone"></span>
                                    <em>Phone: 1-800- 624-5462</em>
                                </div>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-fax"></span>
                                    <em>FAX: 1-800- 624-5462</em>
                                </div>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-envelope"></span>
                                    <em>Email: info@domain.com</em>
                                </div>
                            </address>
                            <address className="b-info__map">
                                <a href="contacts.html">Open Location Map</a>
                            </address>
                        </div>
                    </div>
                </div>
            </div>
            {/* b-info */}


        </div>
    );
};
export default Home;