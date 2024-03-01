import '../App.css';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

function Menubar() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticated(!!user);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the auth state changes when the component unmounts
    };
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Successful logout
        setAuthenticated(false);
      })
      .catch((error) => {
        // Handle logout error
        console.error('Logout error:', error);
      });
  };

  return (
    <header className="App-header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li>
            {authenticated
              ? <a href="/" onClick={handleLogout} className="auth-link logout">Log out</a>
              : <a href="/login" className="auth-link login">Log In</a>
            }
          </li>
        </ul>
      </nav>
    </header>

  );
}

export default Menubar;