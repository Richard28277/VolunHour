import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './EventEntryForm.css';

const EventEntryForm = () => {
  const [organization, setOrganization] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventHours, setEventHours] = useState('');
  const [url, setUrl] = useState('');

  const sanitizeDate = (date) => {
    return date.replace(/\//g, '-');
  };

  const handleSubmit = () => {
    const sanitizedEventDate = sanitizeDate(eventDate);
    const formattedEventName = `${sanitizedEventDate} | ${eventName}`;
    const eventUrl = `https://volunhour.vercel.app/loghours/${formattedEventName}/${eventHours}/${organization}`;
    setUrl(eventUrl);
  };

  const handlePrintPage = () => {
    window.print(); // Trigger the print dialog to print the entire page
  };

  return (
    <div className="event-entry-form">
      <h2>Event Entry Form</h2>
      <form>
        <label>Organization Name:</label>
        <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />

        <label>Event Date (mm/yy/yyyy):</label>
        <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />

        <label>Event Name:</label>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />

        <label>Volunteer Hours:</label>
        <input type="text" value={eventHours} onChange={(e) => setEventHours(e.target.value)} />
        <button type="button" onClick={handleSubmit}>Generate QR Code</button>
      </form>

      {url && (
        <div>
          <p>Generated URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          <div>
            <p>QR Code:</p>
            <QRCode value={url} size={256} />
          </div>
        </div>
      )}
      <button type="button" onClick={handlePrintPage}>Print Page</button>
    </div>
  );
};

export default EventEntryForm;
