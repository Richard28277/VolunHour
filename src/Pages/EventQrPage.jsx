import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import Popup from '../Components/Popup';

const EventQrPage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [popupMessage, setPopupMessage] = useState('Event uploaded to server. Make sure to save the event QR code or URL.');
  const location = useLocation();

  // Function to parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const eventName = queryParams.get('name');
  const organization = queryParams.get('organization');
  const hours = queryParams.get('hours');
  const data = queryParams.get('data');
  const url = `https://volunhour.vercel.app/loghours?data=${data}`;


  const handlePrintPage = () => {
    window.print(); // Trigger the print dialog to print the entire page
  };

  return (
    <div className="event-entry-form">
      <h1>VolunHour Event QR Code</h1>
      <p>Please scan QR code to log activity into your Volunhour account. Use any QR code scanning app. </p>
      <h2>{eventName}</h2>
      <h3>{organization}</h3>
      <h3>Volunteer Hours: {hours}</h3>
      <p className="important-text">  
        *Important: Make sure you are signed in to your Volunhour account before scanning the QR code.  
      </p>  
      <p>Volunhour QR Code:</p>
      {url && <QRCode value={url} size={256} />}
      <p>Generated URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      <button type="button" onClick={handlePrintPage}>Print Page</button>
      {showPopup && (
        <Popup
            display={showPopup}
            options={{
            title: "Success!",
            onConfirm: () => setShowPopup(false),
            onCancel: () => setShowPopup(false),
            confirmText: 'Close',
            }}
            context={<p>{popupMessage}</p>}
        />
        )}
    </div>
  );
};

export default EventQrPage;
