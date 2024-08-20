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
     className="flex justify-between items-center px-8 w-full h-20 bg-white py-4">
      {/* Logo */}
      <div className="flex items-center">
        <img className="h-16 bg-transparent" src={logo} alt="logo" />
      </div>

      {/* Burger Menu Button */}
      <div>
        <button
          className="relative block transition text-primary focus:outline-none"
          onClick={() => setClick(!click)}
          style={{ zIndex: 100 }}
        >
          {click ? <FaTimes className=" text-2xl" /> : <CiMenuBurger className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar Menu for mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-[#323540E5] z-30 transform transition-transform duration-300 ${click ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="p-10 text-lg text-left text-white ml-14">
          <Link to="/" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Forside</li>
          </Link>
          <Link to="/produckter" onClick={() => setClick(false)}>
            <li className="py-4 my-4 cursor-pointer hover:border-primary">Produckter</li>
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

