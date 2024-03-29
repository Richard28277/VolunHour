import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

const Dashboard = ( {authUser} ) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('Loading...');
  const [data, setData] = useState([]);
  const [totalHours, setTotalHours] = useState(0); // State for total hours

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        auth.currentUser.getIdToken(/* forceRefresh */ true)
          .then((idToken) => {
            fetchData(authUser.email);
          })
          .catch((error) => {
            // Handle any errors that occurred during ID token retrieval
            console.error('Error occurred while retrieving ID token:', error);
          });
      } else {
        window.location.href = '/login';
        setUser(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  async function fetchData() {
    try {
      const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
      const response = await fetch('https://rich28277.pythonanywhere.com/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: token }), // Serialize email as a JSON object
      });

      if (response.ok) {
        const jsonData = await response.json();
        setName(jsonData.name);

        const eventHistory = Object.entries(jsonData.event_history || {}).map(([eventId, event]) => ({
          id: eventId,
          name: event.name,
          hours: event.hours,
          organization: event.organization,
          contactEmail: event.contact_email,
        }));

        setData(eventHistory);

        const total = Math.round(Object.values(jsonData.event_history || {}).reduce((total, event) => total + event.hours, 0) * 10) / 10;
        setTotalHours(total);
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const clearEvent = async (eventId) => {
    const confirmed = window.confirm('Are you sure you want to clear this event?');
    if (confirmed) {
      try {
        const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
        const response = await fetch('https://rich28277.pythonanywhere.com/api/clear_history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: token,
            event_key: eventId,
          }),
        });

        if (response.ok) {
          fetchData(); // Refresh the event data after clearing
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clearAllEvents = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all events? This action cannot be undone. '); // Show confirmation dialog

    if (confirmed) {
      try {
        const token = await auth.currentUser.getIdToken(/* forceRefresh */ true);
        const response = await fetch('https://rich28277.pythonanywhere.com/api/clear_history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: token,
          }),
        });

        if (response.ok) {
          fetchData(); // Refresh the event data after clearing all events
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account, including event history? This action cannot be undone.');
    if (confirmed) {
      try {
        // Get the current user's ID token
        const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
  
        // Send a DELETE request to your backend
        const response = await fetch('https://rich28277.pythonanywhere.com/api/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: idToken,
          }),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          alert('Your account has been successfully deleted.');
          window.location.href = '/login'; // Redirect to signup or login page
        } else {
          throw new Error(responseData.message || 'Failed to delete your account.');
        }
      } catch (error) {
        console.error('Error deleting user account:', error);
        alert(`Failed to delete your account. Please try again or contact support if the problem persists. Error: ${error.message}`);
      }
    }
  };
  

  return (
    <article>
      {user ? (
        <>
        <div className="dashboard-container">
          <div className="card welcome-card">
            <h2>Welcome, {name}!</h2>
          </div>
          <div className="card user-info-card">
            <h3>User Information</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>Note: To change account info, please contact us. </p>
          </div>
          </div>
          <div className="card event-info-card">
            <h3>Event Information</h3>
            <p>Total Hours: {totalHours}</p>
            {data && data.length > 0 ? (
              <div className="event-table-container">
                <table>
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Event Name</th>
                    <th>Hours</th>
                    <th>Contact Person</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((event) => (
                    <tr key={event.id} className="table-row fade-in"> {/* Add fade-in animation to each row */}
                      <td>{event.organization}</td>
                      <td>{event.name}</td>
                      <td>{event.hours} hours</td>
                      <td>{event.contactEmail}</td>
                      <td>
                        <button className="button-grow" onClick={() => clearEvent(event.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>No event data available.</p>
            )}
            <button className="clear-events-button" onClick={clearAllEvents}>Clear All Events</button>
            <button className="clear-events-button" onClick={deleteAccount}>Delete Account (Permanent)</button>
          </div>
        </>
      ) : (
        <div className="card login-prompt-card">
          <p>Please sign in to view user information.</p>
        </div>
      )}
    </article>
  );
};

export default Dashboard;