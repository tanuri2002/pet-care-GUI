import React from "react";
import './Testimonials.css';
// import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';

function TestimonialSlider(){
    return(
        <div className="container">
            <div className="slider-wrapper">
                <div className="card-list">
                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="James Wilson" className="user-image" />
                        <h2 className="user-name">James Wilson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="Sarah John" className="user-image" />
                        <h2 className="user-name">Sarah John</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="Daniel Johnson" className="user-image" />
                        <h2 className="user-name">Daniel Johnson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="Laura Thompson" className="user-image" />
                        <h2 className="user-name">Laura Thompson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="James Wilson" className="user-image" />
                        <h2 className="user-name">James Wilson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="James Wilson" className="user-image" />
                        <h2 className="user-name">James Wilson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="James Wilson" className="user-image" />
                        <h2 className="user-name">James Wilson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>

                    <div className="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="James Wilson" className="user-image" />
                        <h2 className="user-name">James Wilson</h2>
                        <p className="user-profession">Software Developer</p>
                        <button className="message-button">Message</button>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        </div>
    );
}
export default TestimonialSlider;