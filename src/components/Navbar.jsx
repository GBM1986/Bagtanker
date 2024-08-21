import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import logo from '../Images/logo/logo-bagtanker-1.png';

export const Navbar = () => {
  const [click, setClick] = useState(false);

  return (
     <nav
     style={{
      background: 'linear-gradient(0deg, rgba(151, 151, 151, 0) 0%, #616161 100%)',
      width: '100%',   // Full width of the container
    }}
     className="flex justify-between items-center px-8 w-full h-26 bg-white py-4">
      {/* Logo */}
      <div className="relative flex items-center justify-center opacity-75">
      {/* Ring (Sun) */}
      <div className="absolute w-[80px] h-[80px] bg-customGold shadow-inset-shadow rounded-full opacity-100 -translate-x-10"></div>

      {/* Text */}
      <h1 className="text-6xl font-irish flex items-center justify-center relative z-10">
        Bagtanker
      </h1>
    </div>


      {/* Burger Menu Button */}
      <div>
        <button
          className="relative block transition text-primary focus:outline-none"
          onClick={() => setClick(!click)}
          style={{ zIndex: 100 }}
        >
          {click ? <FaTimes className=" text-2xl text-white" /> : <CiMenuBurger className="text-2xl text-white" />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-[#323540E5] z-30 transform transition-transform duration-300 ${click ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="p-10 text-lg text-left text-white ml-14">
          <Link to="/" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Forside</li>
          </Link>
          <Link to="/produkter" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Produkter</li>
          </Link>
          <Link to="/nyheder" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Nyheder</li>
          </Link>
          <Link to="/kontakt" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Kontakt</li>
          </Link>
          <Link to="/login" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Login</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

