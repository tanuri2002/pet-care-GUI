import React from 'react';
import { Link } from 'react-router-dom';
import './navstyles.css';

const NavigationBar = () => {
    return (
        <div className="navbar">
            <div className="logo">PawDiaries</div>
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/profile">Pet Profile</Link></li>
            </ul>
        </div>
    );
};

export default NavigationBar;
