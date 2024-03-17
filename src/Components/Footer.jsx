
import '../App.css';
import React, { useState } from 'react';
import Popup from './Popup';
import releaseNotes from '../assets/changelog.json';
import LICENSE from '../assets/LICENSE.txt';
import About from './About';

function Footer() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupOptions, setPopupOptions] = useState({});

  const handlePopup = (content, title) => {
    if (typeof content === "function") { // Check if content is a function to handle dynamic content loading
      content().then(text => setPopupContent(text)); // Execute function and set content
    } else {
      setPopupContent(content);
    }
    
    setPopupOptions({
      title: title,
      onConfirm: () => {
        console.log("Confirmed!");
        setIsPopupVisible(false);
      },
      onCancel: () => {
        console.log("Cancelled!");
        setIsPopupVisible(false);
      },
      confirmText: 'Close',
    });
    setIsPopupVisible(true);
  };

  const fetchLicenseContent = async () => {
    const response = await fetch(LICENSE);
    const text = await response.text();
    return text;
  };

  const renderReleaseNotes = () => (
    releaseNotes.map((note, index) => (
      <div key={index} className="release-note">
        <strong>{note.version}</strong> [{note.date}]: {note.description}
      </div>
    ))
  );

  const renderAboutSection = () => (
    <About />
  );

  return (
    <footer>
      <nav>
        <ul className="footer-nav">
          <li><a href="#!" onClick={(e) => { e.preventDefault(); handlePopup(renderReleaseNotes(), "Release Notes") }}>VolunHour v1.4.1 (Release Notes)</a></li>
          <li><a href="#!" onClick={(e) => { e.preventDefault(); handlePopup(fetchLicenseContent, "License Information") }}>License</a></li>
          <li><a href="#!" onClick={(e) => { e.preventDefault(); handlePopup(renderAboutSection(), "About VolunHour") }}>About VolunHour</a></li>
          <li><a href="#!" onClick={(e) => { e.preventDefault(); handlePopup("Please email us at rich28277@gmail.com", "Contact Us") }}>Contact</a></li>
        </ul>
      </nav>
      <Popup
        display={isPopupVisible}
        options={popupOptions}
        context={popupContent}
      />
    </footer>
  );
}

export default Footer;
