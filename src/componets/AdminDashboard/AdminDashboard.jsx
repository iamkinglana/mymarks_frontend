import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost/backend/analytics.php");
      setAnalytics(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {analytics ? (
        <div>
          <h3>Ticket Status Overview</h3>
          <ul>
            {analytics.map((item, index) => (
              <li key={index}>
                {item.status}: {item.total} tickets
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
}

export default AdminDashboard;
