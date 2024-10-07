import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm({ ticketId }) {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost/backend/submit-feedback.php', {
        ticketId: ticketId,
        rating: rating,
        comments: comments,
      });
      setResponse(result.data);
    } catch (error) {
      setResponse({ success: false, message: 'Error submitting feedback' });
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating (1-5):</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" required />
        </div>
        <div>
          <label>Comments:</label>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} required></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>

      {response && (
        <div>
          <h3>{response.success ? 'Feedback Submitted' : 'Submission Failed'}</h3>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
