import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Home extends Component {
  render() {
    const { authUser } = this.props; // Assuming `authUser` prop is passed down to Home

    return (
      <article>
        <header className="fade-in">
          <img src="/20766168_0_final.png" alt="VolunHour" width="100%" height="auto" />
          <h1>Welcome to VolunHour</h1>
          <p>A platform that connects organizations with users and helps track volunteer hours</p>
        </header>
        
        <section className="fade-in">
          {!authUser && (
            <>
              <h2>Get started today</h2>
              <Link to="/register">
                <button className="grow">Sign up</button>
              </Link>
            </>
          )}
        </section>
        
        <section className="fade-in">
          <h2>What we offer</h2>
          <ul>
            <li>Connect with local organizations</li>
            <li>Track your volunteer hours</li>
            <li>Build your resume with valuable experience</li>
          </ul>
        </section>
        
        <section className="fade-in">
          {authUser ? (
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <button className="grow">Go to Dashboard</button>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="grow">Login</button>
            </Link>
          )}
          <Link to="/create_event" style={{ textDecoration: 'none' }}> 
            <button className="grow">Create Event</button>
          </Link>
          <Link to="/events" style={{ textDecoration: 'none' }}> 
            <button className="grow">Find Events</button>
          </Link>
        </section>
        
      </article>
    );
  }
}

export default Home;
