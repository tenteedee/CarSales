import React, { useEffect } from 'react';

const OverlayImage = ({ onDisappear }) => {
  useEffect(() => {
    const overlayImage = document.querySelector('.overlay-image');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scale = 1 + (scrollY / maxScroll) * 3; // Zoom effect
      const opacity = 1 - (scrollY / maxScroll); // Fade out effect

      overlayImage.style.transform = `scale(${scale})`;
      overlayImage.style.opacity = `${opacity}`;

      // Trigger the onDisappear callback when opacity <= 0
      if (opacity <= 0 && onDisappear) {
        onDisappear(); // Notify to remove the overlay
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onDisappear]);

  return (
    <div className="overlay-image">
      <img 
        src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp" 
        alt="overlay" 
      />
    </div>
  );
};

export default OverlayImage;
