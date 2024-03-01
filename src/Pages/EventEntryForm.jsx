import QRCode from 'qrcode.react';
import './EventEntryForm.css';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const EventEntryForm = () => {
  // Declare state hooks at the top level of the component
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventHours, setEventHours] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true); 

  // Utility function for date sanitization
  const sanitizeDate = (date) => {
    return date.replace(/\//g, '-');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        window.location.href = '/login';
      } else {
        setUser(authUser); // Set the user state
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []); // Empty dependency array to run the effect once on mount

  // Utility function to convert date format
  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split("/");
    return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
  };

  // Utility function to check date format
  const isDateFormatValid = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  // Function to set today's date
  const setTodayAsEventDate = () => {
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
    setEventDate(formattedDate);
  };
  
  const handleSubmit = () => {
    if (!user || !organization || !eventDate || !eventName || !eventHours || !eventLocation || !eventTime || !eventDescription) {
      console.log('All fields are required');
      setIsValid(false); // Set isValid to false if any field is empty
      return;
    }
    // Check if eventDate is in the correct format
    if (!isDateFormatValid(eventDate)) {
      console.log('Event date must be in mm/dd/yyyy format');
      setIsValid(false); // Set isValid to false if date format is incorrect
      return;
    }
    // Prepare data to be sent to the API
    const eventData = {
      name: eventName,
      location: eventLocation,
      time: eventTime,
      date: convertDateFormat(eventDate),
      description: eventDescription,
      organization: organization,
      link: eventLink ? eventLink : 'No link avaliable',
      contact_email: user.email,
    };
    APIsync(eventData);
    const sanitizedEventDate = sanitizeDate(eventDate);
    const formattedEventName = `${sanitizedEventDate} | ${eventName}`;
    // Prepare the data string
    const dataString = `${user.email}/${formattedEventName}/${eventHours}/${organization}`;
    // Encode the data string using Base64
    const encodedData = btoa(dataString);
    // Use the encoded data in the URL
    const eventUrl = `https://volunhour.vercel.app/loghours?data=${encodedData}`;
    setUrl(eventUrl);
  };  

  const APIsync = async (data) => {
    try {
      const response = await fetch('https://rich28277.pythonanywhere.com/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Event added successfully');
        // Optionally reset form fields here
      } else {
        throw new Error(`Failed to add event: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  const handlePrintPage = () => {
    window.print(); // Trigger the print dialog to print the entire page
  };

  return (
    <div className="event-entry-form">
      <h2>Event Entry Form</h2>
      {!isValid && <p className="error-message">**Make sure all fields are in exact format**</p>}
      <form>
        <label>Organization Name:</label>
        <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />

        <label>Event Date (mm/dd/yyyy): [<a href="#" onClick={setTodayAsEventDate}>Set Today's Date</a>]</label>
        <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        

        <label>Event Name:</label>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />

        <label>Volunteer Hours:</label>
        <input type="text" value={eventHours} onChange={(e) => setEventHours(e.target.value)} />

        <label>Location:</label>
        <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />

        <label>Time:</label>
        <input type="text" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />

        <label>Description:</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />

        <label>Event Page URL link (Optional):</label>
        <input type="text" value={eventLink} onChange={(e) => setEventLink(e.target.value)} />

        <button type="button" onClick={handleSubmit}>Submit Event</button>
      </form>

      {/* QR Code and Print button */}
      {url && (
        <div>
          <p>Generated URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          <div>
            <QRCode value={url} size={256} />
            <button type="button" onClick={handlePrintPage}>Print Page</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default EventEntryForm;
