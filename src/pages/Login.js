import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from './LoginValidation';
import './login.css'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Proceed only if there are no validation errors
        if (Object.keys(validationErrors).length === 0) {
            try {
                // Replace this with your API endpoint
                const response = await fetch('http://your-api-endpoint/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    // Redirect to the home page if login is successful
                    navigate('/home');
                } else {
                    alert(data.message || 'Invalid login credentials');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div>
            
                <form onSubmit={handleSubmit}>
                <div className="divisionSignIn">
                <div className="signIn-box">
                    <div>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            name='email'
                            value={values.email}
                            onChange={handleInput} 
                            className="form-control"
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            name='password'
                            value={values.password}
                            onChange={handleInput} 
                            className="form-control"
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>

                    <button type='submit'>Log in</button>
                    <p>You're agreeing to our terms and policies</p>
                    <Link to="/signupp">Create Account</Link>
                    </div>
                    </div>
                </form>
           
        </div>
    );
}

export default Login;
