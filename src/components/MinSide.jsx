import React, { useState, useEffect } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';
import { useAuth } from '../providers/AuthProvider';

export const MinSide = () => {
  const { supabase } = useSupabase();
  const { loginData } = useAuth();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    if (supabase && loginData?.user) {
      fetchUserComments();
    }
  }, [supabase, loginData]);

  const fetchUserComments = async () => {
    try {
      const { user } = loginData;
      if (user) {
        const { data, error } = await supabase
          .from('user_comments')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching comments:', error);
          setError('Error fetching comments.');
        } else {
          setComments(data);
        }
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err.message);
      setError('An unexpected error occurred.');
    }
  };

  const handleEdit = async () => {
    if (editCommentId) {
      try {
        const { error } = await supabase
          .from('user_comments')
          .update({ comment: newCommentText })
          .eq('id', editCommentId);

        if (error) {
          console.error('Error updating comment:', error);
          setError('Error updating comment.');
        } else {
          setComments(comments.map(comment =>
            comment.id === editCommentId ? { ...comment, comment: newCommentText } : comment
          ));
          setEditCommentId(null);
          setNewCommentText('');
        }
      } catch (err) {
        console.error('An unexpected error occurred:', err.message);
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('user_comments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting comment:', error);
        setError('Error deleting comment.');
      } else {
        setComments(comments.filter(comment => comment.id !== id));
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err.message);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <h1 className='font-bold text-2xl mb-4'>Min side</h1>
      <h2 className='font-bold text-xl mb-4'>Mine kommentarer</h2>
      <div className="comments-container flex flex-wrap gap-4">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item border p-4 flex flex-col items-start w-1/4">
            <p>{comment.comment}</p>
            <div className="comment-actions mt-2 flex gap-2">
              <button
                className="edit-button bg-customGold text-white px-2 py-1"
                onClick={() => {
                  setEditCommentId(comment.id);
                  setNewCommentText(comment.comment);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button bg-red-500 text-white px-2 py-1"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editCommentId && (
        <div className="edit-form mt-4">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="border p-2 w-full"
            rows="4"
          />
          <div className="mt-2 flex gap-2">
            <button
              className="save-button bg-customGold text-white px-4 py-2"
              onClick={handleEdit}
            >
              Save
            </button>
            <button
              className="cancel-button bg-gray-500 text-white px-4 py-2"
              onClick={() => setEditCommentId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
