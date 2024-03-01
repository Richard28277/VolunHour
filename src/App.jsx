import React, { useState, useEffect } from 'react';
import './App.css';
import Menubar from './Components/Menubar';
import Footer from './Components/Footer';
import Home from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Events from './Pages/Events.jsx';
import Loghours from './Pages/LogHours.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import EventEntryForm from './Pages/EventEntryForm';

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log('user is logged in', user.email);
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
          <Route exact path="/" element={<Home authUser={user} />} />
          <Route path="/register" element={<Register authUser={user} />} />
          <Route path="/login" element={<Login authUser={user} />} />
          <Route path="/dashboard" element={<Dashboard authUser={user} />} />
          <Route path="/events" element={<Events authUser={user} />} />
          <Route path="/loghours" element={<Loghours authUser={user} />} />
          <Route path="/create_event" element={<EventEntryForm authUser={user} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
