import React, { useState, useEffect } from 'react';
import bgFour from '../Images/bread-full04.jpeg';
import bgFive from '../Images/bread-full05.jpeg';
import bgNine from '../Images/bread-full09.jpeg';
import bgTen from '../Images/bread-full10.jpeg';
import './Frontpage.css'; // Import your custom CSS
import { Navbar } from '../components/Navbar';

export const Frontpage = () => {
  const backgrounds = [

    `url(${bgFour})`,
    `url(${bgFive})`,
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
      id='image-change'
      className="w-full h-screen bg-cover bg-center bg-transition"
      style={{
        backgroundImage: backgrounds[currentBgIndex],
      }}
    >
      <Navbar />
    </div>
  );
};
