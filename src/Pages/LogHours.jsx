import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { auth } from '../firebase';
import sjcl from 'sjcl';

const LogHours = () => {
  // Assuming the data is passed as a query parameter now, not via useParams
  const location = useLocation(); // Use useLocation to access query params
  const [user, setUser] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    contactEmail: '',
    eventName: '',
    eventHours: '',
    eventOrg: '',
  });

  // Helper function to parse query parameters
  const parseQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  // Function to decrypt data
  function decryptData(encryptedData, passphrase) {
    console.log(encryptedData);
    // Decryption using the parameters stored in the encrypted data
    const decryptedData = sjcl.decrypt(passphrase, encryptedData);
    return decryptedData;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  
    // Decode the data parameter from the URL
    const queryParams = parseQueryParams(location.search);
    const dataParam = queryParams.get('data');
    if (dataParam) {
      const decodedString = decryptData(dataParam, 'volunhour'); // Decode the Base64 string
      const [contactEmail, eventName, eventHours, eventOrg] = decodedString.split('%20');
      console.log(contactEmail, eventName, eventHours, eventOrg);
      setEventDetails({ contactEmail, eventName, eventHours, eventOrg });
    } else {
      console.log('No data parameter found in the URL');
    }

    return () => unsubscribe();
  }, [location.search]);

  async function logHours() {
    try {
      if (!user) {
        console.log('User not authenticated');
        return;
      }

      const user_id_token = await user.getIdToken();
      const { eventName, eventOrg, eventHours, contactEmail} = eventDetails;
      const event_hours = parseFloat(eventHours);

      const response = await fetch('https://rich28277.pythonanywhere.com/api/loghours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user_id_token, event_org: eventOrg, event_name: eventName, event_hours: event_hours, contact_email: contactEmail }),
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
            Event Name: <strong>{eventDetails.eventName}</strong>
          </p>
          <p>
            Event Organization: <strong>{eventDetails.eventOrg}</strong>
          </p>
          <p>
            Event Hours: <strong>{eventDetails.eventHours}</strong>
          </p>
          <p>
            Contact Person: <strong>{eventDetails.contactEmail}</strong>
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
