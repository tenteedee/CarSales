import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Slider() {
    const { t } = useTranslation(); // Initialize translation function
    const config = useSelector((state) => state.config.config);

    const [currentIndex, setCurrentIndex] = useState(0); // Track current slide
    const images = [
        { src: './images/4.jpg', title: 'MercedesBenz CLS63 AMG', price: '$214,900', model: '2015' },
        { src: './images/2.jpg', title: 'MercedesBenz CLS63 AMG', price: '$214,900', model: '2015' }
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <section className="b-slider">
                <div className="custom-slider">
                    <div className="slider-container">
                        {images.map((image, index) => (
                            <div
                                className={`slider-item ${index === currentIndex ? 'active' : ''}`}
                                key={index}
                                style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                            >
                                <img src={image.src} alt="sliderImg" />
                                <div className="container">
                                    <div className="carousel-caption b-slider__info">
                                        <h3>{t('FIND_YOUR_DREAM_CAR')}</h3>
                                        <h2>
                                            {image.title} <br />
                                        </h2>
                                        <p>
                                            {t('MODEL')} {image.model} <span>{image.price}</span>
                                        </p>
                                        <a className="btn m-btn" href="detail.html">
                                            {t('SEE_DETAILS')}
                                            <span className="fa fa-angle-right"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="slider-control left" onClick={handlePrev}>
                        <span className="fa fa-angle-left"></span>
                    </button>
                    <button className="slider-control right" onClick={handleNext}>
                        <span className="fa fa-angle-right"></span>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Slider;
