import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Home extends Component {
  render() {
    return (
      <article>
        <header>
          <img src="/20766168_0_final.png" alt="Description of the image" width="100%" align='center' height="auto" />
          <h1>Welcome to VolunHour</h1>
          <p>A platform that connects organizations with users and helps track volunteer hours</p>
        </header>
        
        <section>
          <h2>Get started today</h2>
          <Link to="/register">
            <button>Sign up</button>
          </Link>
        </section>
        
        <section>
          <h2>What we offer</h2>
          <ul>
            <li>Connect with local organizations</li>
            <li>Track your volunteer hours</li>
            <li>Build your resume with valuable experience</li>
          </ul>
        </section>
        
        <section>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
          <Link to="/create_event" style={{ textDecoration: 'none' }}> 
            <button>Create Event</button>
          </Link>
          <Link to="/events" style={{ textDecoration: 'none' }}> 
            <button>Find Events</button>
          </Link>
        </section>
      </article>
    );
  }
}

export default Home;
