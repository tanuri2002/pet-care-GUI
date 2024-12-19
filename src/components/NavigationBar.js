import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navstyles.css';

const NavigationBar = () => {
    return(
        <div className="navbar">
            <div className="logo">PawDiaries</div>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Pet Profile</a></li>
            </ul>
        </div>
    );
};

export default NavigationBar;