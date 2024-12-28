import React from 'react';
import './Map.css';

const Map = () => {
    return (
        <div class="map-container">
        <div class="mapswrapper">
            <iframe width="600" height="450" loading="lazy" allowfullscreen 
             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Australia%3A%20Narrogin%2C%20Western%20Australia.&zoom=10&maptype=roadmap"></iframe>
        </div>

        <div className='box'>
            <p style={{ fontSize: "20px", fontFamily: "Brush Script, cursive"}}>Visit Our Loaction</p>
            <br></br>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Hours:</p>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Monday - Friday: 8am-6pm</p>
            <p style={{ fontFamily: "Brush Script, cursive" }}>Saturday: 9am-3pm</p>

            <br></br>
        </div>

        </div>
    )
}
export default Map;