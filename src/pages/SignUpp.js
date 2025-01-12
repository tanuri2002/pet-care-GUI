import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignUpValidation";
import { useState } from "react";
import axios from "axios";
import  './signupp.css';
import Footer from "../components/Footer";

function SignUpp() {
    const [values, setValues] = useState({   //useState provides a function to change the values of "values" and also, it initializes the values with empty values here.
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();  //Initializes the navigate function, which is used to programmatically redirect the user to another route

    const [errors, setErrors] = useState({});  //errors: Holds error messages for form fields (name, email, password).
                                               //setErrors: Updates the errors state based on validation results.

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        console.log("Validation Errors:", validationErrors); // Check errors
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) { // No errors
            console.log("Sending data to server:", values);
            axios.post('http://localhost:8081/signup', values)
                .then((res) => {
                    console.log('Signup successful:', res);
                    navigate('/signin');
                })
                .catch((err) => {
                    console.error('Signup error:', err);
                });
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="divisionSignUp">
                <div className="signUp-box">
                
                <div>
                <label htmlFor="name" className="label"><strong>Name</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        onChange={handleInput}
                        className="form-control"
                    />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                </div>

                <div>
                    <label htmlFor="email" className="label"><strong>Email</strong></label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
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
                        name="password"
                        onChange={handleInput}
                        className="form-control"
                    />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>

                <button type="submit">Sign Up</button>
                <p>You're agree to our terms and policies</p>
                <Link to="/signin">Login</Link>
                </div>
                </div>
            </form>
            
        </div>
        
    );
}

export default SignUpp;
