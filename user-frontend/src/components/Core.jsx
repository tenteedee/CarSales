import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
const Core = () => {
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        // Page Preloader
        const preloader = document.getElementById('page-preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }

        // Handle Scroll for "Go to Top" Button
        const handleScroll = () => {
            if (window.scrollY > 650) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
};
export default Core;
