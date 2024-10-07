import React, { useState } from 'react';
import axios from 'axios';

function RequestForm() {
  const [studentId, setStudentId] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost/backend/submit-request.php', {
        studentId: studentId,
        courseCode: courseCode,
        description: description,
      });
      setResponse(result.data);
    } catch (error) {
      setResponse({ success: false, message: 'Error submitting request' });
    }
  };

  return (
    <div>
      <h2>Submit a Missing Mark Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        </div>
        <div>
          <label>Course Code:</label>
          <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h3>{response.success ? 'Request Submitted' : 'Submission Failed'}</h3>
          {response.success && <p>Ticket ID: {response.ticketId}</p>}
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}

export default RequestForm;
