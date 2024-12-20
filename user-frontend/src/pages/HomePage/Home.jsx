import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CarFilter from './CarFilter';
import Slider from './Slider';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation(); // Initialize translation function
    const config = useSelector((state) => state.config.config);

    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(
        params.get('description') || ''
    );

    return (
        <div>
            <Slider />

            <CarFilter />

            <section className="b-world clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-xs-12">
                            <div
                                className="b-world__item wow zoomInLeft"
                                data-wow-delay="0.3s"
                            >
                                <img
                                    className="img-responsive"
                                    src="media/370x200/wolks.jpg"
                                    alt="wolks"
                                />
                                <div className="b-world__item-val">
                                    <span className="b-world__item-val-title">
                                        {t('WE_OFFER')}
                                    </span>
                                </div>
                                <h2>{t('LOW_PRICES_NO_HAGGLING')}</h2>
                                <p>{t('DESCRIPTION_TEXT')}</p>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div
                                className="b-world__item wow zoomInUp"
                                data-wow-delay="0.3s"
                            >
                                <img
                                    className="img-responsive"
                                    src="media/370x200/mazda.jpg"
                                    alt="mazda"
                                />
                                <div className="b-world__item-val">
                                    <span className="b-world__item-val-title">
                                        {t('WE_ARE_THE')}
                                    </span>
                                </div>
                                <h2>{t('LARGEST_CAR_DEALERSHIP')}</h2>
                                <p>{t('DESCRIPTION_TEXT')}</p>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div
                                className="b-world__item wow zoomInRight"
                                data-wow-delay="0.3s"
                            >
                                <img
                                    className="img-responsive"
                                    src="media/370x200/chevrolet.jpg"
                                    alt="chevrolet"
                                />
                                <div className="b-world__item-val">
                                    <span className="b-world__item-val-title">
                                        {t('OUR_CUSTOMERS_GET')}
                                    </span>
                                </div>
                                <h2>{t('MULTIPOINT_SAFETY_CHECK')}</h2>
                                <p>{t('DESCRIPTION_TEXT')}</p>
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
                                        <Link
                                            to="/car-loan"
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <div
                                                className="b-welcome__services-auto wow zoomInLeft"
                                                data-wow-delay="0.3s"
                                            >
                                                <div className="b-welcome__services-img m-auto">
                                                    <span className="fa fa-cab"></span>
                                                </div>
                                                <h3>{t('AUTO_LOANS')}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-xs-12 text-right visible-md visible-lg">
                                        <div
                                            className="m-circle wow slideInRight"
                                            data-wow-delay="0.3s"
                                        >
                                            <span className="b-welcome__services-circle"></span>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 m-padding">
                                        <div
                                            className="b-welcome__services-buying wow zoomInLeft"
                                            data-wow-delay="0.3s"
                                        >
                                            <div className="b-welcome__services-img m-buying">
                                                <span className="fa fa-book"></span>
                                            </div>
                                            <h3>{t('BUYING_GUIDE')}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div
                                className="b-welcome__text wow zoomInUp"
                                data-wow-delay="0.3s"
                            >
                                <h2>{t('WORLDS_LEADING_CAR_DEALER')}</h2>
                                <h3>{t('WELCOME_TO_AUTOCLUB')}</h3>
                                <p>{t('WELCOME_DESCRIPTION')}</p>
                                <p>{t('SECOND_PARAGRAPH')}</p>
                                <ul>
                                    <li>
                                        <span className="fa fa-check"></span>
                                        {t('CHECK_ITEM_1')}
                                    </li>
                                    <li>
                                        <span className="fa fa-check"></span>
                                        {t('CHECK_ITEM_2')}
                                    </li>
                                    <li>
                                        <span className="fa fa-check"></span>
                                        {t('CHECK_ITEM_3')}
                                    </li>
                                    <li>
                                        <span className="fa fa-check"></span>
                                        {t('CHECK_ITEM_4')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="b-welcome__services">
                            <div className="col-md-3 col-xs-12">
                                <div className="row">
                                    <div className="col-xs-12 m-padding">
                                        <div
                                            className="b-welcome__services-trade wow zoomInRight"
                                            data-wow-delay="0.3s"
                                        >
                                            <div className="b-welcome__services-img m-trade">
                                                <span className="fa fa-male"></span>
                                            </div>
                                            <h3>{t('TRADE_INS')}</h3>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 text-left visible-md visible-lg">
                                        <div
                                            className="m-circle pull-right wow slideInLeft"
                                            data-wow-delay="0.3s"
                                        >
                                            <span className="b-welcome__services-circle m-left"></span>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 m-padding">
                                        <div
                                            className="b-welcome__services-support wow zoomInRight"
                                            data-wow-delay="0.3s"
                                        >
                                            <div className="b-welcome__services-img m-support">
                                                <svg
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="45px"
                                                    height="45px"
                                                    viewBox="0 0 612 612"
                                                >
                                                    <g>
                                                        <path d="M257.938,336.072c0,17.355-14.068,31.424-31.423,31.424c-17.354,0-31.422-14.068-31.422-31.424 c0-17.354,14.068-31.423,31.422-31.423C243.87,304.65,257.938,318.719,257.938,336.072z M385.485,304.65 c-17.354,0-31.423,14.068-31.423,31.424c0,17.354,14.069,31.422,31.423,31.422c17.354,0,31.424-14.068,31.424-31.422 C416.908,318.719,402.84,304.65,385.485,304.65z M612,318.557v59.719c0,29.982-24.305,54.287-54.288,54.287h-39.394 C479.283,540.947,379.604,606.412,306,606.412s-173.283-65.465-212.318-173.85H54.288C24.305,432.562,0,408.258,0,378.275v-59.719 c0-20.631,11.511-38.573,28.46-47.758c0.569-84.785,25.28-151.002,73.553-196.779C149.895,28.613,218.526,5.588,306,5.588 c87.474,0,156.105,23.025,203.987,68.43c48.272,45.777,72.982,111.995,73.553,196.779C600.489,279.983,612,297.925,612,318.557z M497.099,336.271c0-13.969-0.715-27.094-1.771-39.812c-24.093-22.043-67.832-38.769-123.033-44.984 c7.248,8.15,13.509,18.871,17.306,32.983c-33.812-26.637-100.181-20.297-150.382-79.905c-2.878-3.329-5.367-6.51-7.519-9.417 c-0.025-0.035-0.053-0.062-0.078-0.096l0.006,0.002c-8.931-12.078-11.976-19.262-12.146-11.31 c-1.473,68.513-50.034,121.925-103.958,129.46c-0.341,7.535-0.62,15.143-0.62,23.08c0,28.959,4.729,55.352,12.769,79.137 c30.29,36.537,80.312,46.854,124.586,49.59c8.219-13.076,26.66-22.205,48.136-22.205c29.117,0,52.72,16.754,52.72,37.424 c0,20.668-23.604,37.422-52.72,37.422c-22.397,0-41.483-9.93-49.122-23.912c-30.943-1.799-64.959-7.074-95.276-21.391 C198.631,535.18,264.725,568.41,306,568.41C370.859,568.41,497.099,486.475,497.099,336.271z M550.855,264.269 C547.4,116.318,462.951,38.162,306,38.162S64.601,116.318,61.145,264.269h20.887c7.637-49.867,23.778-90.878,48.285-122.412 C169.37,91.609,228.478,66.13,306,66.13c77.522,0,136.63,25.479,175.685,75.727c24.505,31.533,40.647,72.545,48.284,122.412 H550.855L550.855,264.269z" />
                                                    </g>
                                                </svg>
                                            </div>
                                            <h3>{t('SUPPORT')}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="b-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xs-12">
                            <aside
                                className="b-info__aside wow zoomInLeft"
                                data-wow-delay="0.3s"
                            >
                                <article className="b-info__aside-article">
                                    <h3>{t('OPENING_HOURS')}</h3>
                                    <div className="b-info__aside-article-item">
                                        <h6>{t('SALES_DEPARTMENT')}</h6>
                                        <p>{t('SALES_HOURS')}</p>
                                    </div>
                                    <div className="b-info__aside-article-item">
                                        <h6>{t('SERVICE_DEPARTMENT')}</h6>
                                        <p>{t('SERVICE_HOURS')}</p>
                                    </div>
                                </article>
                                <article className="b-info__aside-article">
                                    <h3>{t('ABOUT_US')}</h3>
                                    <p>{t('ABOUT_US_DESC')}</p>
                                </article>
                            </aside>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <div className="b-info__latest">
                                <h3
                                    className="wow slideInUp"
                                    data-wow-delay="0.3s"
                                >
                                    {t('LATEST_AUTOS')}
                                </h3>
                                {/* Repeat for each latest article */}
                                <div
                                    className="b-info__latest-article wow slideInUp"
                                    data-wow-delay="0.3s"
                                >
                                    <div className="b-info__latest-article-photo m-audi"></div>
                                    <div className="b-info__latest-article-info">
                                        <h6>
                                            <a href="detail.html">
                                                MERCEDES-AMG GT S
                                            </a>
                                        </h6>
                                        <div className="b-featured__item-links m-auto">
                                            <a href="#">{t('USED')}</a>
                                            <a href="#">{t('YEAR_2014')}</a>
                                            <a href="#">{t('MANUAL')}</a>
                                            <a href="#">{t('COLOR_ORANGE')}</a>
                                            <a href="#">{t('PETROL')}</a>
                                        </div>
                                        <p>
                                            <span className="fa fa-tachometer"></span>{' '}
                                            35,000 KM
                                        </p>
                                    </div>
                                </div>
                                {/* Add more latest vehicles similarly... */}
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <address
                                className="b-info__contacts wow slideInUp"
                                data-wow-delay="0.3s"
                            >
                                <p>{t('CONTACT_US')}</p>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-map-marker"></span>
                                    <em>{t('ADDRESS')}</em>
                                </div>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-phone"></span>
                                    <em>{t('PHONE')}</em>
                                </div>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-fax"></span>
                                    <em>{t('FAX')}</em>
                                </div>
                                <div className="b-info__contacts-item">
                                    <span className="fa fa-envelope"></span>
                                    <em>{t('EMAIL')}</em>
                                </div>
                            </address>
                            <address className="b-info__map">
                                <a href="/contacts">{t('OPEN_LOCATION_MAP')}</a>
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
