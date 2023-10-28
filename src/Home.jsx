import React, { Component } from 'react';
import './App.css';

class Home extends Component {
  render() {
    return (
      <article>
      <header>
        <img src="public/20766168_0_final.png" alt="Description of the image" width="100%" align='center' height="auto"></img>
        <h1>Welcome to VolunHour</h1>
        <p>A platform that connects organizations with users and helps track volunteer hours</p>
      </header>
      
      <section>
        <h2>Get started today</h2>
        <button>Sign up as an organization</button>
        <button>Sign up as a volunteer</button>
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
        <a href="/login" style={{ textDecoration: 'none' }}><button>Login</button></a>
      </section>
    </article>
    );
  }
}

export default Home;
