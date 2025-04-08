import React, { useState } from 'react';
import API from '../api';

const ReviewForm = ({ businessId, onReviewed }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reviews', { businessId, rating, comment });
      onReviewed(); // Refresh reviews
      setRating(5);
      setComment('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block mb-1 font-medium">Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} className="p-2 border rounded w-full">
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
        </select>
      </div>
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="Write your comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
