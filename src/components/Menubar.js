import logo from '../logo.svg';
import '../App.css';
import React from 'react';

function Menubar() {
  return (
    <header className="App-header">
        <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">About Us</a></li>
            <li style={{ backgroundColor: 'yellow', padding: '4px', borderRadius: '10px' }}><a href="#">Log In</a></li>
        </ul>
        </nav>
    </header>
  );
}

export default Menubar;
