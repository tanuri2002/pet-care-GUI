import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the login request to the backend (MongoDB authentication endpoint)
    axios.post('http://localhost:5000/login', { email, password })
      .then(result => {
        console.log(result); // Logs the result of the request
        if (result.data === "Success") {
          navigate('/home'); // Redirects to home page on successful login
        } else {
          alert('Invalid login credentials'); // Alert if login fails
        }
      })
      .catch(err => {
        console.error('Error:', err); // Logs any error that occurs
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          className="login-image"
          src="/images/signin.png"
          alt="signin pic"
        />
      </div>

      <div className="login-right">
        <p className="login-header">Sign In</p>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="formEmail" className="form-label"><strong>Email address</strong></label>
              <input
                type="email"
                name="email"
                id="formEmail"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group relative">
              <label htmlFor="formPassword" className="form-label"><strong>Password</strong></label>
              <div className="password-container">
                <input
                  type={open ? 'text' : 'password'}
                  name="password"
                  id="formPassword"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-toggle" onClick={toggle}>
                  {open ? <FaRegEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <div className="signup-link">
            <p>Don't have an account?</p>
            <a href="/signupp" className="signup-link-text">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
