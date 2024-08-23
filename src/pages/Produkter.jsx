import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ProduktCard } from '../components/ProduktCard';

export const Produkter = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
