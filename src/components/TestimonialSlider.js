import React from "react";
import './Testimonials.css';
// import 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';

function TestimonialSlider(){
    return(
        <div class="container">
            <div class="slider-wrapper">
                <div class="card-list">
                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">James Wilson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">Sarah John</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">Daniel Johnson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">Laura Thompson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">James Wilson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">James Wilson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">James Wilson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>

                    <div class="card-item">
                        <img src={process.env.PUBLIC_URL + "/images/p14.jpg"} alt="user image" class="user-image"></img>
                        <h2 class="user-name">James Wilson</h2>
                        <p class="user-profession">Software Developer</p>
                        <button class="message-button">Message</button>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        </div>
    );
}
export default TestimonialSlider;