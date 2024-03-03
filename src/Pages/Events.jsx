import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [organizationFilter, setOrganizationFilter] = useState(''); // State variable for organization filter

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        window.location.href = '/login';
      } else {
        fetchEvents(); // Initial fetch without filter
      }
    });

    return () => unsubscribe();
  }, []); // Removed organizationFilter from dependency array

  const fetchEvents = async (filter = '') => {
    try {
      // Adjusted to optionally use a filter
      const url = `https://rich28277.pythonanywhere.com/api/events${filter ? `?organization=${filter}` : ''}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        throw new Error('Error: ' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterClick = () => {
    fetchEvents(organizationFilter); // Use the current organizationFilter state
  };

  return (
    <div>
      {/* Flex container for input and button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
        <input
          type="text"
          placeholder="Filter by organization..."
          value={organizationFilter}
          onChange={(e) => setOrganizationFilter(e.target.value)}
          style={{ marginRight: '10px' }} // Add some space between the input and the button
        />
        <button onClick={handleFilterClick} style={{ margin: '5px' }}>Filter</button>
      </div>
      <ul>
        {events.map((event) => (
          <article key={event.id} className="fade-in">
            <h2>{event.name}</h2>
            <p><strong>VolunHour ID:</strong> {event.id}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Organization:</strong> {event.organization}</p>
            <p><strong>Link:</strong> {event.link}</p>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <button>View Event</button>
            </a>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default Events;
