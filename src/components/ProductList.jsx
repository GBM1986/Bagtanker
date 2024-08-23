import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSupabase } from '../providers/SupabaseProvider';
import produktimage from '../Images/Surdejsbrod.png'
import { Link, useParams } from 'react-router-dom';

export const ProductList = () => {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const {category_id} = useParams();

  console.log(category_id)

  useEffect(() => {
    const getProducts = async () => {
      if (supabase) {

      const { data, error } = await supabase
        .from('category_product_rel')
        .select('*,products(*,images(filename))')
        .eq('category_id', category_id);
      

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        console.log('Products:', data);
      }


      // if (error) {
      //   console.error('Error fetching products:', error);
      //   setError('Error fetching products.');
      // } else {
      //   console.log('Products:', data);
      //   setProducts(data);
      //   // Initialize likes and isLiked states
      //   const initialLikes = data.reduce((acc, product) => {
      //     acc[product.id] = 0;
      //     return acc;
      //   }, {});
      //   setLikes(initialLikes);
      //   const initialIsLiked = data.reduce((acc, product) => {
      //     acc[product.id] = false;
      //     return acc;
      //   }, {});
      //   setIsLiked(initialIsLiked);
      // }}

    }
    };

    getProducts();
  }, [supabase, category_id]);




  return (
    <div className="mb-52 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {products.map((product) => {


        return (
          <div key={id} className="flex p-6 mb-4">
            <div className="w-1/3 mr-6">
              <img
                src={produktimage}
                alt={title}
                className="w-full h-full object-cover object-fit border"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-4">{description}</p>
              <div className="flex justify-between items-center">
                {/* Corrected Link closing tag */}
                <Link
                  to={`/produkter/details/${id}`} // Dynamic route using product ID
                  className="bg-[#D89F5F] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
