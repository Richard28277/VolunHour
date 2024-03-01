import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        window.location.href = '/login';
      } else {
        const fetchEvents = async () => {
          try {
            const response = await fetch('https://rich28277.pythonanywhere.com/api/events');
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
        fetchEvents();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
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
          <p><strong>Contact Person:</strong> {event.contact_email}</p>
          <p><strong>Link:</strong> {event.link}</p>
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            <button>View Event</button>
          </a>
          
        </article>
      ))}
    </ul>
  );
};

export default Events;
