import '../App.css';
import React from 'react';

function About() {
  return (
    <body>
        <h1>VolunHour</h1>
        <p><strong>2023 Congressional App Challenge Project</strong></p>
        <p><strong>Author:</strong> Richard Xu</p>
        <p><strong>VolunHour</strong> is a web application designed to simplify and streamline the process of tracking volunteer hours for both organizations and volunteers. By generating unique QR codes for volunteer events, it allows volunteers to effortlessly log their hours by scanning the code, eliminating the need for manual record-keeping.</p>

        <h2>Features</h2>
        <ul>
            <li><strong>Create Volunteer Activities</strong>: Organizations can input event information such as the event name, date, and volunteer time to generate event-specific QR codes.</li>
            <li><strong>Effortless Logging</strong>: Volunteers can log their hours by simply scanning the QR code at the event site. The app automatically records event details and volunteer service hours in their account, making it convenient and efficient.</li>
            <li><strong>Progressive Web App (PWA)</strong>: VolunHour is built as a Progressive Web App, making it accessible both as a mobile app and a website. Users can install it on their smartphones for a mobile experience.</li>
            <li><strong>Data Storage</strong>: Volunteer records are securely stored in a Firebase Realtime Database in the cloud, ensuring data integrity and accessibility.</li>
            <li><strong>User Authentication and Backend</strong>: The app uses a Python Flask server for user authentication and backend functionalities, providing robust security and reliability.</li>
            <li><strong>Community Engagement</strong>: Ability for organizations to connect with volunteers by adding public events</li>
            <li><strong>SQL Database</strong>: Events and volunteer opportunities are stored in an SQL database, facilitating efficient data management.</li>
        </ul>

        <h2>Why VolunHour?</h2>
        <p>The inspiration behind VolunHour came from the challenges of managing volunteer hours in a real-world volunteer organization. The app offers a practical solution to simplify this process, making it more organized and efficient. It is designed to save time for both volunteers and organizations and foster better connectivity within the volunteer community.</p>

        <h2>Technical Details</h2>
        <p>VolunHour is built using React and JavaScript for the front end, with a Python Flask server handling user authentication and the backend. The app uses Firebase for real-time storage of user's volunteer records, and an SQL database for storing events and volunteer opportunities.</p>

        <h2>How to Use</h2>
        <p>For more information, please go to the project github page: <a href="https://github.com/Richard28277/VolunHour">Link here</a></p>
    </body>
  );
}

export default About;