import React, { useState, useEffect } from 'react';
import { auth } from './firebase';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
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
        }));

        setData(eventHistory);

        const total = Object.values(jsonData.event_history || {}).reduce((total, event) => total + event.hours, 0);
        setTotalHours(total);
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const clearEvent = async (eventId) => {
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
  };

  const clearAllEvents = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all events?'); // Show confirmation dialog

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

  return (
    <div className="dashboard">
      {user ? (
        <>
          <h2>Welcome, {name}!</h2>
          <div className="user-info">
            <h3>User Information</h3>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <h3>Event Information</h3>
            <p>Total Hours: {totalHours}</p>
            {data.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Event Name</th>
                    <th>Hours</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((event) => (
                    <tr key={event.id} className="table-row"> {/* Add a class to the table row */}
                      <td>{event.organization}</td>
                      <td>{event.name}</td>
                      <td>{event.hours} hours</td>
                      <td>
                        <button onClick={() => clearEvent(event.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No event data available.</p>
            )}
            <button onClick={clearAllEvents}>Clear All Events</button>
          </div>
        </>
      ) : (
        <p>Please sign in to view user information.</p>
      )}
    </div>
  );
};

export default Dashboard;