import React, { useEffect, useState } from "react";
import "./profile.css";

function Profile() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch("http://localhost:5000/pets");
      if (!response.ok) throw new Error("Failed to fetch pets");
      const data = await response.json();
      setPets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id, updatedData) => {
    fetch(`http://localhost:5000/pets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPets(pets.map(pet => pet._id === id ? data.pet : pet));
        setEditingPet(null); // Close the edit form
        alert(data.message);
      })
      .catch((err) => alert(`Error updating pet: ${err.message}`));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      fetch(`http://localhost:5000/pets/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          setPets(pets.filter(pet => pet._id !== id));
          alert(data.message);
        })
        .catch((err) => alert(`Error deleting pet: ${err.message}`));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Pets</h1>
      <div className="profiles">
        {pets.map((pet) => (
          <div key={pet._id} className="profile-card">
            <div className="profile-image">
              {pet.petPhoto ? (
                <img
                  src={`http://localhost:5000${pet.petPhoto}`}
                  alt={`${pet.petName}'s Photo`}
                />
              ) : (
                <p>No photo available</p>
              )}
            </div>
            
            {editingPet === pet._id ? (
              <div className="profile-edit-form">
                <input
                  type="text"
                  defaultValue={pet.petName}
                  onChange={(e) => pet.petName = e.target.value}
                />
                <input
                  type="text"
                  defaultValue={pet.petType}
                  onChange={(e) => pet.petType = e.target.value}
                />
                <input
                  type="text"
                  defaultValue={pet.petBreed}
                  onChange={(e) => pet.petBreed = e.target.value}
                />
                <input
                  type="number"
                  defaultValue={pet.petAge}
                  onChange={(e) => pet.petAge = e.target.value}
                />
                <input
                  type="text"
                  defaultValue={pet.petColor}
                  onChange={(e) => pet.petColor = e.target.value}
                />
                <div>
                  <button
                    onClick={() => handleUpdate(pet._id, {
                      petName: pet.petName,
                      petType: pet.petType,
                      petBreed: pet.petBreed,
                      petAge: pet.petAge,
                      petColor: pet.petColor
                    })}
                    className="save-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPet(null)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-details">
                <p><strong>Name:</strong> {pet.petName}</p>
                <p><strong>Type:</strong> {pet.petType}</p>
                <p><strong>Breed:</strong> {pet.petBreed}</p>
                <p><strong>Age:</strong> {pet.petAge}</p>
                <p><strong>Colour:</strong> {pet.petColor}</p>
                <button
                  onClick={() => setEditingPet(pet._id)}
                  className="update-button"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;