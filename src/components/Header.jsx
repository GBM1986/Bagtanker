import React from 'react';
import logo from '../Images/logo/logo-bagtanker-1.png';
import { Navbar } from './Navbar';
import { FullMenu } from './Fullmenu';
import BannerBg from '../Images/bread-full04.jpeg';

export const Header = () => {
  return (
    <header>
      {/* Apply background image directly to Navbar */}
      <div
        className="w-full h-28 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BannerBg})`, // Set the background image
        }}
      >
        <Navbar />
      </div>
      <FullMenu />
    </header>
  );
};
