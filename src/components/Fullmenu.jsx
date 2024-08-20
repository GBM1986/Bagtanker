import React from 'react';
import { Link } from 'react-router-dom';

export const FullMenu = () => {
  return (
    <div className="xl:flex space-x-8 text-lg ml-12">
      <Link className="pl-8 cursor-pointer" to="/">Forside</Link>
      <Link className="cursor-pointer" to="/lineup">Lineup</Link>
      <Link className="cursor-pointer" to="/program">PROGRAM</Link>
      <Link className="cursor-pointer" to="/camps">CAMPS</Link>
      <Link className="cursor-pointer" to="/info">INFO</Link>
      <Link className="cursor-pointer" to="/købbillet">KØB BILLET</Link>
      <Link className="cursor-pointer" to="/login">LOGIN</Link>
    </div>
  );
};


