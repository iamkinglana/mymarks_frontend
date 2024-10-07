import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './componets/Login/Login';
// import TicketsList from './components/TicketsList';
// import TicketDetail from './components/TicketDetail';
// import NewTicket from './components/NewTicket';
// import EditTicket from './components/EditTicket';
// import Header from './components/Header';
import Header from './Header'
// import NotFound from './components/NotFound';
import TrackStatus from './componets/TrackStatus/TrackStatus';
import AdminDashboard from './componets/AdminDashboard/AdminDashboard';
import FeedbackForm from './componets/Feedback/FeedbackForm';
// import PrivateRoute from './PrivateRoute';
import RequestForm from './componets/RequestForm/RequestForm';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authenticate user and set token in Axios for future requests
  const authenticateUser = async () => {
    try {
      const response = await axios.get('/auth/user');  // Get user and role
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Authentication error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();  // Authenticate user on mount
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);  // Set user and role from login
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  const handleLogout = () => {
    setUser(null);
    axios.defaults.headers.common['Authorization'] = '';  // Clear auth header on logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected Routes based on roles */}
          {/* {user ? ( */}
            {/* <> */}
              {/* Accessible to all authenticated users */}
              {/* <Route path="/tickets" element={<TicketsList />} />
              <Route path="/tickets/:id" element={<TicketDetail />} /> */}

              {/* Only allow students to create new tickets */}
              {/* {user.role === 'student' && <Route path="/tickets/new" element={<NewTicket />} />} */}

              {/* Only allow lecturers or admin to edit tickets */}
              {/* {(user.role === 'lecturer' || user.role === 'admin') && <Route path="/tickets/edit/:id" element={<EditTicket />} />} */}

              {/* Default route */}
              {/* <Route path="/" element={<Navigate to="/tickets" />} /> */}
            {/* </> */}
          {/* ) : ( */}
            <Route path="/" element={<Navigate to="/login" />} />
          {/* )} */}

          {/* 404 Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
