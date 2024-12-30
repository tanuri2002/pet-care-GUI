import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignUpValidation";
import { useState } from "react";
import axios from "axios";

function SignUpp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        console.log("Validation Errors:", validationErrors); // Debugging step
        setErrors(validationErrors);
        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            console.log("Sending data to server:", values); // Debugging step
            axios.post('http://localhost:8081/signup', values)
                .then((res) => {
                    console.log('Signup successful:', res);
                    navigate('/signin'); // Ensure the path here is correct.
                })
                .catch((err) => {
                    console.error('Signup error:', err);
                });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name"><strong>Name</strong></label>
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
                    <label htmlFor="email"><strong>Email</strong></label>
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
            </form>
        </div>
    );
}

export default SignUpp;
