import React from 'react';
import './Footer.css';

function Footer(){
    return(
    <div className='footer-container'>
        <div className='logo-name'>
        <center><img src={process.env.PUBLIC_URL + "/images/logo.png"}  alt="paw" className='footer-img'></img></center>
        <font face="kalam"><center><p>PawDiaries</p></center></font>
        </div>

        <center><font face="kalam"><p>Follow us on social media</p></font></center>

        <div className='apps'>
            <img src={process.env.PUBLIC_URL + "/images/59439-removebg-preview.png"} alt="facebook" className='appPic'></img>
            <img src={process.env.PUBLIC_URL + "/images/twitterpng-removebg-preview.png"} alt="twitter" className='appPic'></img>
            <img src={process.env.PUBLIC_URL + "/images/insta2-removebg-preview.png"} alt="insta" className='appPic'></img>
        </div>
        <center><p><font face="kalam"><font size="1"><i>All rights reserved</i></font></font></p></center>
    </div>
    
    );
}

export default Footer;