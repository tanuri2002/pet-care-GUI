import React from 'react';
import './HomeCards.css';

function HomeCards() {
    const cards = [
        { id: 1, title: "Dog Day Care", description: "A fun, safe place for your dog to play and relax while you’re away.", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Grooming", description: "Professional grooming to keep your pet clean, styled, and happy.", image: "https://via.placeholder.com/150" },
        { id: 3, title: "Training", description: "Tailored programs to teach obedience, skills, and better behavior.", image: "https://via.placeholder.com/150" },
        { id: 4, title: "Puppy School", description: "Socialize and train your puppy with fun, structured classes.", image: "https://via.placeholder.com/150" },
        { id: 5, title: "Venue Bookings", description: "Reserve our dog-friendly parks and spaces for events or playtime.", image: "https://via.placeholder.com/150" },
        { id: 6, title: "Breed MeetUp Events", description: "Connect with others at breed-specific meetups full of fun!", image: "https://via.placeholder.com/150" },
    ];

    return (
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
    );
}

export default HomeCards;
