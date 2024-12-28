import React from "react";
import './SignUpBox.css'
import { useNavigate } from "react-router-dom";

function SignUpBox(){
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/signin"); // Redirect to the Sign-In page
    };
    return(
        <div className="divisionSignUp">
        <div className="signUp-box">
            <div>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Name</p>
            <input type="text" />
            </div>

            <div className="type">
            <p style={{ fontFamily: "Brush Script, cursive" }}>Pet type</p>
            <select>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
            </select>
            </div>

            <div>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Pet's Name</p>
            <input type="text" />
            </div>

            <div>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Email</p>
            <input type="text" />
            </div>

            <div>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Password</p>
            <input type="password" />
            </div>

            <button onClick={handleSignUpClick} className="custom-button">Sign Up</button>  
            </div>
        </div>
    )
}
export default SignUpBox;