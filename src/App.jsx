import React, { useState, useEffect } from 'react';
import './App.css';
import Menubar from './Menubar.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Events from './Events.jsx';
import Loghours from './LogHours.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log('user is logged in ');
      } else {
        setUser(null);
        console.log('not logged in');
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Menubar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/loghours/:eventName/:eventHours/:eventOrg" element={<Loghours />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
