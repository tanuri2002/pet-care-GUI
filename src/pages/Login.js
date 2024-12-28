import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from './LoginValidation';

function Login(){
    const[values,setValues]=useState({
        email:'',
        password:''
    });
    const [errors,setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
    }

    return(
        <div >
            <div className="bg-white p-3 rounded w-25">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name='email'
                        onChange={handleInput} className="form-control"></input>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name='password'
                        onChange={handleInput} className="form-control"></input>
                        {errors.password && <span className="text-danger">{errors.password}</span>}

                    </div>

                    <button type='submit'>Log in</button>
                    <p>You're agree to our terms and policies</p>
                    <Link to="/signupp">Create Account</Link>
                </form>

            </div>

        </div>
    )
}
export default Login;