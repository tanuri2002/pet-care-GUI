import React, { useState } from "react";
import './ContactBox.css';

function ContactBox() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container-contact">
            <div className="detail-box">
                <p style={{ fontSize: "20px", fontFamily: "Brush Script, cursive" }}>Get In Touch</p>
                <br />
                <p style={{ fontFamily: "Brush Script, cursive" }}>
                    Get in touch with PawDiaries through any of our channels. We’re excited to hear from you!
                </p>
                <br />

                <div className="details">
                    <p style={{ fontFamily: "Brush Script, cursive", fontSize: "13px" }}>Phone : +94 775667834</p>
                    <p style={{ fontFamily: "Brush Script, cursive", fontSize: "13px" }}>Email : PawDiaries@gmail.com</p>
                    <p style={{ fontFamily: "Brush Script, cursive", fontSize: "13px" }}>
                        Address : 581 Murray Street West Perth Western Australia, 6005
                    </p>
                </div>
            </div>

            <div className="comment-box">
                <form onSubmit={handleSubmit}>
                    <p style={{ fontFamily: "Brush Script, cursive" }}>Your Name :</p>
                    <br />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <br />
                    <p style={{ fontFamily: "Brush Script, cursive" }}>Your Email :</p>
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <br />
                    <p style={{ fontFamily: "Brush Script, cursive" }}>Your Message :</p>
                    <br />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ContactBox;
