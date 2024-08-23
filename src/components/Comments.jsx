import React, { useEffect, useState } from "react";
import { useSupabase } from "../providers/SupabaseProvider";
import { useAuth } from "../providers/AuthProvider";

export const Comments = ({ productId }) => {
  const { supabase } = useSupabase();
  const { loginData } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch comments when the component mounts or when productId changes
    const fetchComments = async () => {
      if (!supabase) return;

      try {
        const { data, error } = await supabase
          .from("user_comments")
          .select("*")
          .eq("product_id", productId);

        if (error) {
          console.error("Error fetching comments:", error);
          setError("Error fetching comments.");
        } else {
          setComments(data || []); // Ensure we set an empty array if data is null
        }
      } catch (err) {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred.");
      }
    };

    fetchComments();
  }, [supabase, productId]);

  useEffect(() => {
    // Update authentication state
    if (loginData && loginData.user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [loginData]);

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_comments")
        .insert([
          {
            title: "User Comment", // Modify as needed
            comment: newComment,
            user_id: loginData.user.id, // Ensure user_id is correctly set
            product_id: productId,
            created_at: new Date().toISOString(),
            is_active: true,
          },
        ]);

      if (error) {
        console.error("Error inserting comment:", error);
        setError("Error submitting comment.");
        return;
      }

      // Check if data is not null and has at least one element
      if (data && data.length > 0) {
        setComments((prevComments) => [...prevComments, data[0]]);
        setNewComment("");
      } else {
        console.error("Unexpected response format from Supabase:", data);
        setError("Unexpected response format.");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {error && <div className="text-red-600">{error}</div>}
      {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}
      {comments.map((comment) => (
        <div key={comment.id} className="border p-4 mb-4">
          <h3 className="font-bold">{comment.title}</h3>
          <p>{comment.comment}</p>
        </div>
      ))}
      {isAuthenticated && (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full"
            rows="4"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2"
          >
            Submit Comment
          </button>
        </div>
      )}
      {!isAuthenticated && <p className="text-red-600">You must be logged in to comment.</p>}
    </div>
  );
};
