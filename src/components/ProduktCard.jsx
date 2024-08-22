import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSupabase } from '../providers/SupabaseProvider';
import produktimage from '../Images/Surdejsbrod.png'
import { Link } from 'react-router-dom';

export const ProduktCard = () => {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('products')
        .select('id, image_id, title, teaser, description, duration, amount, price');

      if (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products.');
      } else {
        setProducts(data);
        // Initialize likes and isLiked states
        const initialLikes = data.reduce((acc, product) => {
          acc[product.id] = 0;
          return acc;
        }, {});
        setLikes(initialLikes);
        const initialIsLiked = data.reduce((acc, product) => {
          acc[product.id] = false;
          return acc;
        }, {});
        setIsLiked(initialIsLiked);
      }
    };

    getProducts();
  }, [supabase]);

  const toggleLike = (productId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [productId]: prevLikes[productId] + (isLiked[productId] ? -1 : 1)
    }));
    setIsLiked(prevIsLiked => ({
      ...prevIsLiked,
      [productId]: !prevIsLiked[productId]
    }));
  };

  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="mb-52 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {products.map((product) => {
        const {
          id,
          title = 'Default Title',
          description = 'No description available',
          image_id: imageUrl = '/Images/bread-full07.jpeg'
        } = product;

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
                <div className="flex items-center ml-auto">  {/* Added ml-auto to push the heart to the right */}
                  <span className="text-gray-800 text-lg">{likes[id]}</span>
                  <button onClick={() => toggleLike(id)} className="ml-2">
                    {isLiked[id] ? (
                      <AiFillHeart className="text-red-500 text-2xl" />
                    ) : (
                      <AiOutlineHeart className="text-gray-500 text-2xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
