import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Validation from "./SignUpValidation"; // Assuming you have a validation file
import './signupp.css'; // Assuming you have styles
import Footer from "../components/Footer"; // Assuming you have a footer component

function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setOpen(!open);
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values); // Perform validation
    console.log("Validation Errors:", validationErrors); // Check errors
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) { // No errors, proceed with registration
      console.log("Sending data to server:", values);
      axios.post('http://localhost:5000/register', values) // Updated to your MongoDB backend URL
        .then((res) => {
          console.log('Signup successful:', res);
          navigate('/login'); // Redirect to login page after successful signup
        })
        .catch((err) => {
          console.error('Signup error:', err);
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-right">
        <p className="signup-header">Sign Up</p>
        <div className="signup-form">

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label"><strong>Name</strong></label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your name"
                onChange={handleInput}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                onChange={handleInput}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label"><strong>Password</strong></label>
              <div className="password-container">
                <input
                  type={open ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  onChange={handleInput}
                />
              <div className="password-icon" onClick={togglePasswordVisibility}>
                {open ? <FaRegEye /> : <FaEyeSlash />}
              </div>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>


            <button type="submit" className="submit-btn">Create Account</button>

            <div className="login-link">
              <span><center>Already have an account?</center></span>
              <Link to="/login" className="login-link-text">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
