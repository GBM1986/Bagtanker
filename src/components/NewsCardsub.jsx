import React, { useEffect, useState } from "react";
import { useSupabase } from "../providers/SupabaseProvider";
import { Comments } from "./Comments";
import { Link } from "react-router-dom";

export const NewsCardSub = () => {
  const { supabase } = useSupabase(); // Access Supabase instance
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      // Ensure Supabase is available
      if (!supabase) {
        console.error("Supabase not initialized");
        setError("Supabase is not initialized.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("news")
          .select("*") // Fetch all news articles
          .order("created_at", { ascending: false }); // Order by latest news first

        if (error) {
          console.error("Error fetching news:", error);
          setError("Error fetching news articles.");
        } else {
          setNewsList(data);
        }
      } catch (err) {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAllNews();
  }, [supabase]); // Add supabase to dependency array

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message if any
  if (newsList.length === 0) return <div>No news articles found.</div>; // Handle case where no news articles are found

  return (
    <div className="p-6 mb-96">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      {newsList.map((news) => (
        <Link to={`/nyheder/${news.id}`} key={news.id}>
        <div key={news.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
          <p className="text-gray-600 mb-2">
            {new Date(news.created_at).toLocaleDateString()}
          </p>
          <p className="mb-4">{news.teaser}</p> {/* Optional teaser or summary */}
          <p className="text-gray-800 line-clamp-3">{news.content}</p>
          <hr className="my-6" />
        </div>
        </Link>
      ))}
    </div>
  );
};
