import React from 'react';
import './Map.css';

const Map = () => {
    return (
        <div class="mapswrapper">
            <iframe width="600" height="450" loading="lazy" allowfullscreen 
             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Australia%3A%20Narrogin%2C%20Western%20Australia.&zoom=10&maptype=roadmap"></iframe>
        </div>
    )
}
export default Map;