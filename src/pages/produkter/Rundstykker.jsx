import React from 'react';
import { useParams } from 'react-router-dom';
import { ProduktCard } from '../../components/ProduktCard';

export const Rundstykker = () => {
  const { productId } = useParams(); // Get productId from URL

  return (
    <div className="">
      <ProduktCard productId={productId} />
    </div>
  );
};