import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
const Core = () => {
    const [showGoToTop, setShowGoToTop] = useState(false);
    // Initialize functionality on component mount
    useEffect(() => {
        initPagePreloader();
        handleEqualHeight();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll event listener for Go to Top button
    const handleScroll = () => {
        if (window.scrollY > 650) {
            setShowGoToTop(true);
        } else {
            setShowGoToTop(false);
        }
    };

    // Smooth scroll to top
    const smoothScrollToTop = () => {
        scroll.scrollToTop();
    };

    // Page Preloader
    const initPagePreloader = () => {
        const preloader = document.getElementById('page-preloader');
        if (preloader) {
            const spinner = preloader.querySelector('.spinner-loader');
            if (spinner) spinner.style.display = 'none';
            preloader.style.display = 'none';
        }
    };

    // Set Equal Height
    const handleEqualHeight = () => {
        const equalHeight = document.body.getAttribute('data-equal-height');
        if (equalHeight) {
            const columns = document.querySelectorAll(equalHeight);
            let tallest = 0;
            columns.forEach((col) => {
                const colHeight = col.offsetHeight;
                if (colHeight > tallest) tallest = colHeight;
            });
            columns.forEach((col) => (col.style.height = tallest + 'px'));
        }
    };
};
export default Core;
