import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navstyles.css';
const NavigationBar = () => {
    return(
        <div>
            <nav>
                <li><a href="#"></a>Home</li>
                <li><a href="#"></a>About Us</li>
                <li><a href="#"></a>Contact Us</li>
                <li><a href="#"></a>Pet Profile</li>

            </nav>
        </div>
    );
};

export default NavigationBar;