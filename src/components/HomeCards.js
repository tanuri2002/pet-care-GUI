import React from 'react';
import './HomeCards.css';

function HomeCards() {
    const cards = [
        { id: 1, title: "Dog Day Care", description: "A fun, safe place for your dog to play and relax while you’re away.", image: "/images/care.avif" },
        { id: 2, title: "Grooming", description: "Professional grooming to keep your pet clean, styled, and happy.", image: "/images/grooming2.avif" },
        { id: 3, title: "Training", description: "Tailored programs to teach obedience, skills, and better behavior.", image: "/images/taining2.jpg" },
        { id: 4, title: "Puppy School", description: "Socialize and train your puppy with fun, structured classes.", image: "/images/school.jpg" },
        { id: 5, title: "Venue Bookings", description: "Reserve our dog-friendly parks and spaces for events or playtime.", image: "/images/venue.jpeg" },
        { id: 6, title: "Breed MeetUp Events", description: "Connect with others at breed-specific meetups full of fun!", image: "/images/meetup.avif" },
    ];

    return (
        <div className='largeCont'>

            <p style={{ fontFamily: "Brush Script, cursive", fontSize:"25px"}}><center>Our Services ...</center></p>
            <div className="home-cards-container">
                {cards.map((card) => (
                    <div key={card.id} className="card">
                        <img src={card.image} alt={card.title} className="card-image" />
                        <div className="card-content">
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-description">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default HomeCards;
