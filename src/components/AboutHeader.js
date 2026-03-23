import React from "react";
import './AboutHeader.css';

function AboutHeader(){
    const bgUrl = process.env.PUBLIC_URL + '/images/vbimg.jpg';
    const boxStyle = {
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    return(
        <div>
        <div className="aboutHeader-container">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={process.env.PUBLIC_URL + "/images/Animal-care-removebg-preview.png"}></img>
            <div className="para">
            <p><b><font color="Black"><font face="inter"><font size="20">Welcome to <font color="#e1b136">PawDiaries</font></font></font></font></b></p>
            <p className="sentence"><font size="3"><font face="Georgia">At PawDiaries, we turn everyday moments into joyful adventures for your pets! 
                From playful day care and stylish grooming to expert training and fun puppy programs, we create a space where every dog can learn, play, and thrive. With exciting meet-ups and pet-friendly venues, PawDiaries is where happy tails never stop wagging!</font></font></p>
            </div>
        </div>

        <p className="topicc"><center><font size="6"><font face="Brush Script, cursive">- Our vision and Mission -</font></font></center></p>
        <div className="mission-vision">
        <div className="mission" style={boxStyle}>
            <h3><font face="inter"><center>Mission</center></font></h3>
            <br></br>
            <p><center>To provide exceptional care, companionship, and enriching experiences for pets, ensuring their happiness and well-being through professional services and a loving environment.</center></p>
        </div>

        <div className="vision" style={boxStyle}>
            <h3><font face="inter"><center>Vision</center></font></h3>
            <br></br>
            <p><center>To create a world where every pet feels loved, cared for, and truly at home, no matter where they are.</center></p>
        </div>
        </div>
        
        </div>
    );
}
export default AboutHeader;