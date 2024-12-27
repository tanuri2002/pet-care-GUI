import React from "react";
import './ContactBox.css';

function ContactBox(){
    return(
        <div className="container-contact">

            <div className="detail-box">
            <p style={{ fontSize: "20px", fontFamily: "Brush Script, cursive"}}>Get In Touch</p>
            <br></br>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Get in touch with PawDiaries through any of our channels. We’re excited to hear from you!</p>
            <br></br>
            
            <div className="details">
                <p style={{ fontFamily: "Brush Script, cursive", fontSize:"13px" }}>Phone   : +94 775667834</p>
                <p style={{ fontFamily: "Brush Script, cursive",fontSize:"13px" }}>Email   : PawDiaries@gmail.com</p>
                <p style={{ fontFamily: "Brush Script, cursive",fontSize:"13px" }}>Address : 581 Murray Street West Perth Western Australia, 6005</p>
                <p></p>
            </div>
            
            </div>

            <div className="comment-box">
                <p style={{ fontFamily: "Brush Script, cursive" }}>Your Name :</p>
                <br></br>
                <input type="text box"></input>
                <br></br>
                <br></br>
                <br></br>
                <p style={{ fontFamily: "Brush Script, cursive" }}>Your Email :</p>
                <br></br>
                <input type="text box"></input>
                <br></br>
                <br></br>
                <br></br>
                <p style={{ fontFamily: "Brush Script, cursive" }}>Your Message :</p>
                <br></br>
                <input type="text area" size="50" ></input>
            </div>
        </div>
    )
}
export default ContactBox;