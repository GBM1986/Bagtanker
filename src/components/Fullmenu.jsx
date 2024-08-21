import React from 'react';
import { Link } from 'react-router-dom';

export const FullMenu = () => {
  return (
    <div className="w-full bg-[#323540E5] xl:flex space-x-24 text-lg pt-10 pb-10 pl-10 text-[#F5F5F0] font-sans font-light">
      <Link className="pl-20 cursor-pointer" to="/produkter/rundstykker">RUNDSTYKKER</Link>
      <Link className="cursor-pointer" to="/produkter/baguettes">BAGUETTES</Link>
      <Link className="cursor-pointer" to="/produkter/franskbrod">FRANSKBRØD</Link>
      <Link className="cursor-pointer" to="/produkter/kager">KAGER</Link>
      <Link className="cursor-pointer" to="/produkter/rugbrod">RUGBRØD</Link>
    </div>
  );
};


