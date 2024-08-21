import React, { useState } from 'react';
import bgFour from '../Images/bread-full04.jpeg';
import bgFive from '../Images/bread-full05.jpeg';
import bgNine from '../Images/bread-full09.jpeg';
import bgTen from '../Images/bread-full10.jpeg';
import { Navbar } from '../components/Navbar';
import "./Frontpage.css"
import NewsCard from '../components/NewsCard';

export const Frontpage = () => {
  const backgrounds = [
    `url(${bgFour})`,
    `url(${bgFive})`,
    `url(${bgNine})`,
    `url(${bgTen})`,
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const handleDotClick = (index) => {
    setCurrentBgIndex(index);
  };

  return (
    <div
      id='image-change'
      className="w-full h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: backgrounds[currentBgIndex],
      }}
    >
      <Navbar />

      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex gap-10 z-50">
        {backgrounds.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 bg-white rounded-full cursor-pointer transition-transform duration-300 ease-out ${index === currentBgIndex ? 'scale-90 bg-customGold' : ''}`}
            style={{ margin: '0 2px' }}
          />
        ))}
      </div>

      <section>
        <NewsCard />
      </section>
    </div>
  );
};
