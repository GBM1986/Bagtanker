import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To extract the newsId from the URL
import { useSupabase } from '../providers/SupabaseProvider';

const NewsDetails = () => {
  const { id } = useParams(); // Extract the newsId from the URL
  const { supabase } = useSupabase();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('news')
        .select('id, title, content, image_id, created_at')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching news details:', error);
        setError('Error fetching news details.');
      } else {
        setNews(data);
      }
    };

    fetchNewsDetails();
  }, [supabase, id]);

  if (error) return <div>{error}</div>;
  if (!news) return <div>Loading...</div>;

  return (
    <div className="max-w-[800px] mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on: {new Date(news.created_at).toLocaleDateString()}
      </p>
      <img
        src={news.image_id ? `/images/${news.image_id}` : '/Images/bread-full07.jpeg'}
        alt={news.title}
        className="w-full h-auto rounded-lg mb-6"
      />
      <p className="text-lg text-gray-800">{news.content}</p>
    </div>
  );
};

export default NewsDetails;
