import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSupabase } from "../providers/SupabaseProvider";
import { Comments } from "../components/Comments";

export const ProduktDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const { supabase } = useSupabase(); // Access Supabase instance
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      // Ensure Supabase is available
      if (!supabase) {
        console.error("Supabase not initialized");
        setError("Supabase is not initialized.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single(); // Fetch single product details based on ID

        if (error) {
          console.error("Error fetching product details:", error);
          setError("Error fetching product details.");
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProductDetails();
  }, [supabase, id]); // Add supabase and id to dependency array

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message if any
  if (!product) return <div>No product found.</div>; // Handle case where product is not found

  return (
    <div className="p-6 mb-96">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.description}</p>

      {/* Comment Section */}
      <Comments productId={id} />
    </div>
  );
};
