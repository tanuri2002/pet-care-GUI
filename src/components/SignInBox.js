import React from "react";
import './SignInBox.css'
import { Link } from "react-router-dom";

function SignInBox(){
    return(
        <div className="division">
        <div className="signIn-box">
            <div className="email">
            <p style={{ fontFamily: "Brush Script, cursive" }}>Email</p>
            <input type="text" />
            </div>

            <div className="password">
            <p style={{ fontFamily: "Brush Script, cursive" }}>Password</p>
            <input type="password" />
            </div>

            <button>Log In</button>

            <div className="signUp">
                <p>Don't have an Account?</p>
                <Link to="/signup" style={{ color: "blue", textDecoration: "none" }}>Sign Up</Link>
            </div>

        </div>
        </div>
    )
}
export default SignInBox;