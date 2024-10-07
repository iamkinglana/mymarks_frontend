import React, { useState } from 'react';
import axios from 'axios';

function TrackStatus() {
  const [ticketId, setTicketId] = useState('');
  const [status, setStatus] = useState(null);

  const handleTrack = async () => {
    try {
      const result = await axios.post('http://localhost/backend/track-request.php', {
        ticketId: ticketId,
      });
      setStatus(result.data);
    } catch (error) {
      setStatus({ success: false, message: 'Error tracking request' });
    }
  };

  return (
    <div>
      <h2>Track Request Status</h2>
      <input type="text" value={ticketId} onChange={(e) => setTicketId(e.target.value)} placeholder="Enter Ticket ID" />
      <button onClick={handleTrack}>Track</button>

      {status && (
        <div>
          <h3>{status.success ? `Status: ${status.status}` : 'Tracking Failed'}</h3>
          <p>{status.message}</p>
        </div>
      )}
    </div>
  );
}

export default TrackStatus;
