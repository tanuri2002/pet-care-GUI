import React, { useEffect, useState } from "react";
import "./profile.css";

function Profile() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPetId, setEditingPetId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:5000/pets", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to fetch pets");
            const data = await response.json();
            setPets(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleUpdate = (id) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/pets/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editFormData),
        })
            .then((response) => response.json())
            .then((data) => {
                setPets(pets.map(pet => pet._id === id ? data.pet : pet));
                setEditingPetId(null);
                alert(data.message);
            })
            .catch((err) => alert(`Error updating pet: ${err.message}`));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            const token = localStorage.getItem('token');
            fetch(`http://localhost:5000/pets/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setPets(pets.filter(pet => pet._id !== id));
                    alert(data.message);
                })
                .catch((err) => alert(`Error deleting pet: ${err.message}`));
        }
    };

    const startEditing = (pet) => {
        setEditingPetId(pet._id);
        setEditFormData({
            petName: pet.petName,
            petType: pet.petType,
            petBreed: pet.petBreed,
            petAge: pet.petAge,
            petColor: pet.petColor
        });
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

                        {editingPetId === pet._id ? (
                            <div className="profile-edit-form">
                                <input
                                    type="text"
                                    name="petName"
                                    value={editFormData.petName}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="petType"
                                    value={editFormData.petType}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="petBreed"
                                    value={editFormData.petBreed}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="number"
                                    name="petAge"
                                    value={editFormData.petAge}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="petColor"
                                    value={editFormData.petColor}
                                    onChange={handleEditChange}
                                />
                                <div>
                                    <button
                                        onClick={() => handleUpdate(pet._id)}
                                        className="save-button"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingPetId(null)}
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
                                    onClick={() => startEditing(pet)}
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