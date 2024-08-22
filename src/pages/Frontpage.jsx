import React, { useState, useEffect } from 'react';
import bgFour from '../Images/bread-full04.jpeg';
import bgFive from '../Images/bread-full05.jpeg';
import bgNine from '../Images/bread-full09.jpeg';
import bgTen from '../Images/bread-full10.jpeg';
import { Navbar } from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import './Frontpage.css';

export const Frontpage = () => {
  // Background images array
  const backgrounds = [
    `url(${bgFour})`,
    `url(${bgFive})`,
    `url(${bgNine})`,
    `url(${bgTen})`,
  ];

  // State to keep track of the current background image
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Automatically change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [backgrounds.length]);

  // Handle manual click on the dots to change the background
  const handleDotClick = (index) => {
    setCurrentBgIndex(index);
  };

  return (
    <div
      id="image-change"
      className="w-full h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: backgrounds[currentBgIndex],
      }}
    >
      <Navbar />

      {/* Background changing dots */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-10 z-50">
        {backgrounds.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 bg-white rounded-full cursor-pointer transition-transform duration-300 ease-out ${index === currentBgIndex ? 'scale-90 bg-[#D89F5F]' : ''}`}
            style={{ margin: '0 2px' }}
          />
        ))}
      </div>

      {/* News section */}
      <section>
        <NewsCard />
      </section>
    </div>
  );
};

export default Frontpage;
