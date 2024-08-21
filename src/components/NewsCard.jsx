import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to /nyheder
import { useSupabase } from '../providers/SupabaseProvider';

const NewsCard = () => {
  const { supabase } = useSupabase();
  const [newsItems, setNewsItems] = useState([]);
  const navigate = useNavigate(); // For navigation to detailed news

  useEffect(() => {
    const fetchNews = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('news')
        .select('id, title, teaser, content, image_id, created_at, is_active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNewsItems(data);
      }
    };

    fetchNews();
  }, [supabase]);

  const handleNewsClick = (newsId) => {
    // Navigate to /nyheder/:id when a news item is clicked
    navigate(`/nyheder/${newsId}`);
  };

  return (
    <>
    <h1 className='p-6 text-4xl  ml-20'>Nyheder</h1>
    <div className="max-w-90 mr-[500px] ml-28 mt- p-4 opacity-80 bg-[#323540] rounded-lg">
      <div className="bg-[#323540] rounded-lg shadow-lg flex flex-col gap-8 p-6 opacity-80 ">
        {/* News List Section */}
        <div className="flex flex-col gap-4 w-full ">
          {newsItems.slice(0, 3).map((news) => (  // Display only the first 3 news items
            <div
              key={news.id}
              className=" cursor-pointer border-white rounded-lg  hover:bg-white-50 transition-colors opacity-80 bg-[#323540]"
              onClick={() => handleNewsClick(news.id)}
            >
              {/* Display image, title, teaser, and content for each news item */}
              <div className="flex gap-4 opacity-[90%] bg-[#323540]">
                {/* News Image */}
                <div className="w-1/3">
                  <img
                    src={news.image_id ? `/images/${news.image_id}` : '/Images/bread-full07.jpeg'}
                    alt={news.title}
                    className="w-full h-auto rounded-lg border"
                  />
                </div>
                
                {/* News Details */}
                <div className="flex-1">
                  <p className="text-gray-200 text-sm mb-2">
                    {new Date(news.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl text-gray-950 font-bold mb-2">{news.title}</h3>
                  <p className="text-white mb-2">{news.teaser}</p>
                  <p className="text-white line-clamp-1">{news.content}</p> {/* Truncated content */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default NewsCard;
