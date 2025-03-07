import React from "react";
import './AboutHeader.css';

function AboutHeader(){
    return(
        <div>
        <div className="aboutHeader-container">
            <img src={process.env.PUBLIC_URL + "/images/Animal-care-removebg-preview.png"}></img>
            <div className="para">
            <p><b><font color="Black"><font face="inter"><font size="20">Welcome to <font color="#e1b136">PawDiaries</font></font></font></font></b></p>
            <p className="sentence"><font size="5"><font face="Georgia">From heartwarming cuddles to playful adventures, we make every moment magical for your dog.</font></font></p>
            </div>
        </div>

        <p className="topicc"><center><font size="6"><font face="inter">Our vision and Mission</font></font></center></p>
        <div className="mission-vision">
        <div className="mission">
            <h3><font face="inter"><center>Mission</center></font></h3>
            <br></br>
            <p><center>To provide exceptional care, companionship, and enriching experiences for pets, ensuring their happiness and well-being through professional services and a loving environment.</center></p>
        </div>

        <div className="vision">
            <h3><font face="inter"><center>Vision</center></font></h3>
            <br></br>
            <p><center>To create a world where every pet feels loved, cared for, and truly at home, no matter where they are.</center></p>
        </div>
        </div>
        
        </div>
    );
}
export default AboutHeader;