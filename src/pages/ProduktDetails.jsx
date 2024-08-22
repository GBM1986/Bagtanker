import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabase } from '../providers/SupabaseProvider';
import Imagesurjdejsbrod from '../Images/Surdejsbrod.png'

export const ProduktDetails = () => {
  const { id } = useParams(); // Get product ID from the URL
  const { supabase } = useSupabase();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product.');
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [supabase, id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mb-80">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={Imagesurjdejsbrod} alt={product.title} className="w-full h-auto mb-4"/>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-gray-600 mb-4">Price: DKK<strong> {product.price}</strong></p>
      <p className="text-gray-600">Amount: <strong>{product.amount}</strong></p>
    </div>
  );
};
