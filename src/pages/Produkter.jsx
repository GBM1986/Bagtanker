import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Produkter = () => {
  return (
    <div>
      <h1>Produkter</h1>
      <Outlet />
    </div>
  );
};
