import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../firebase';

const LogHours = () => {
  const { eventName, eventHours, eventOrg } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  async function logHours() {
    try {
      if (!user) {
        console.log('User not authenticated');
        return;
      }

      const user_id_token = await user.getIdToken();
      const event_name = eventName;
      const event_org = eventOrg;
      const event_hours = parseFloat(eventHours);

      const response = await fetch('https://rich28277.pythonanywhere.com/api/loghours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user_id_token, event_org, event_name, event_hours }),
      });

      if (response.ok) {
        console.log('Hours logged successfully.');
        window.location.href = '/dashboard';
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="log-hours-page">
      {user ? (
        <>
          <h2>Log Hours</h2>
          <p>
            User: <strong>{user.email}</strong>
          </p>
          <p>
            Event Name: <strong>{eventName}</strong>
          </p>
          <p>
            Event Organization: <strong>{eventOrg}</strong>
          </p>
          <p>
            Event Hours: <strong>{eventHours}</strong>
          </p>
          <button onClick={logHours}>Log Hours</button>
        </>
      ) : (
        <p>Please sign in to log hours.</p>
      )}
    </div>
  );
};

export default LogHours;
