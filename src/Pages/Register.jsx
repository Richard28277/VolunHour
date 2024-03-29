import {useState} from 'react'
import {auth} from '../firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from '../AuthContext'
import './LoginPage.css';
import React from 'react';

function Register() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
              const userData = {
                user_id: idToken,
                user_name: name,
                event_history: [],
                email_: email
              };
              
              fetch('https://rich28277.pythonanywhere.com/api/user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data); // User information updated successfully
                })
                .catch(error => {
                  console.error(error);
                });
            }).catch(function(error) {
              console.log("error with create user account 66")
            });
            navigate('/dashboard')
          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    
    
    
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='name' 
            value={name}
            placeholder="Enter your full name  "
            required
            onChange={e => setName(e.target.value)}/>
          
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>
          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <br></br>
        <span>
          Already have an account?  
          <Link to='/login'> Login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register