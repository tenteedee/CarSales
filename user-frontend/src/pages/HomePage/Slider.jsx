import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Slider() {
    const { t } = useTranslation(); // Initialize translation function
    const config = useSelector((state) => state.config.config);

    return (
        <div>
            <section className="b-slider">
                <div id="carousel" className="slide carousel carousel-fade">
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="./images/4.jpg" alt="sliderImg" />
                            <div className="container">
                                <div className="carousel-caption b-slider__info">
                                    <h3>{t('FIND_YOUR_DREAM_CAR')}</h3>
                                    <h2>
                                        MercedesBenz <br />
                                        CLS63 AMG
                                    </h2>
                                    <p>
                                        {t('MODEL')} 2015 <span>$214,900</span>
                                    </p>
                                    <a className="btn m-btn" href="detail.html">
                                        {t('SEE_DETAILS')}
                                        <span className="fa fa-angle-right"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="./images/2.jpg" alt="sliderImg" />
                            <div className="container">
                                <div className="carousel-caption b-slider__info">
                                    <h3>{t('FIND_YOUR_DREAM_CAR')}</h3>
                                    <h2>
                                        MercedesBenz <br />
                                        CLS63 AMG
                                    </h2>
                                    <p>
                                        {t('MODEL')} 2015 <span>$214,900</span>
                                    </p>
                                    <a className="btn m-btn" href="detail.html">
                                        {t('SEE_DETAILS')}
                                        <span className="fa fa-angle-right"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a
                        className="carousel-control right"
                        href="#carousel"
                        data-slide="next"
                    >
                        <span className="fa fa-angle-right m-control-right"></span>
                    </a>
                    <a
                        className="carousel-control left"
                        href="#carousel"
                        data-slide="prev"
                    >
                        <span className="fa fa-angle-left m-control-left"></span>
                    </a>
                </div>
            </section>
        </div>
    );
}

export default Slider;
