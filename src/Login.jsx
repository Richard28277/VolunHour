import { useState } from 'react';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthValue } from './AuthContext';
import './LoginPage.css';
import React, { useEffect } from 'react';

function Login() {
  console.log('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setError('');

    // Sign in the user with email and password using firebase
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => setError(err.message));

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        window.location.href = '/dashboard';
      }
    });

    // Make sure to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="center">
      <div className="auth">
        <h1>Login</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
