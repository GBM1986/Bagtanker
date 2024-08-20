import React, { useState, useEffect } from 'react';
import bgOne from '../Images/bread-full01.jpeg';
import bgTwo from '../Images/bread-full02.jpeg';
import bgThree from '../Images/bread-full03.jpeg';
import bgFour from '../Images/bread-full04.jpeg';
import bgFive from '../Images/bread-full05.jpeg';
import bgSix from '../Images/bread-full06.jpeg';
import bgSeven from '../Images/bread-full07.jpeg';
import bgEight from '../Images/bread-full08.jpeg';
import bgNine from '../Images/bread-full09.jpeg';
import bgTen from '../Images/bread-full10.jpeg';
import './Nyheder.css'; // Import your custom CSS
import { Navbar } from '../components/Navbar';

export const Nyheder = () => {
  const backgrounds = [
    `url(${bgOne})`,
    `url(${bgTwo})`,
    `url(${bgThree})`,
    `url(${bgFour})`,
    `url(${bgFive})`,
    `url(${bgSix})`,
    `url(${bgSeven})`,
    `url(${bgEight})`,
    `url(${bgNine})`,
    `url(${bgTen})`,
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [backgrounds.length]);

  return (
    <div
      id="image-change"
      className="w-full h-screen bg-cover bg-center transition-all duration-1000 ease-in-out" // Add transition classes
      style={{
        backgroundImage: backgrounds[currentBgIndex],
      }}
    >
      <Navbar />
    </div>
  );
};
