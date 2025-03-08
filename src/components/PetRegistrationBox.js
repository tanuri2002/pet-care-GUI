import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./petRegistrationBox.css";

function PetRegistrationBox() {
    const [formData, setFormData] = useState({
        petName: "",
        petType: "",
        petBreed: "",
        petAge: "",
        petColor: "",
        petPhoto: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const dogBreeds = ["Golden Retriever", "Labrador", "Beagle", "Poodle"];
    const catBreeds = ["Persian", "Siamese", "Maine Coon", "Bengal"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, petPhoto: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("petName", formData.petName);
        formDataToSend.append("petType", formData.petType);
        formDataToSend.append("petBreed", formData.petBreed);
        formDataToSend.append("petAge", formData.petAge);
        formDataToSend.append("petColor", formData.petColor);
        if (formData.petPhoto) {
            formDataToSend.append("petPhoto", formData.petPhoto);
        }

        try {
            const response = await fetch("http://localhost:5000/register-pet", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Pet registered successfully!");
                navigate("/profile");
            } else {
                const text = await response.text();
                try {
                    const errorData = JSON.parse(text);
                    alert(`Failed to register pet: ${errorData.message || errorData.errors?.[0]?.msg || "Server error"}`);
                } catch (parseError) {
                    alert(`Failed to register pet: ${text || "Server error"}`);
                }
            }
        } catch (error) {
            console.error("Error registering pet:", error);
            alert(`An error occurred: ${error.message || "Please try again."}`);
        } finally {
            setIsLoading(false);
        }
    };

    const breeds = formData.petType === "dog" ? dogBreeds : formData.petType === "cat" ? catBreeds : [];

    return (
        <div className="split-container">
            <div className="form-container">
                <div className="registration-box">
                    <form onSubmit={handleSubmit}>
                        <div className="topic">
                            <center><p className="form-title">Add a Pet</p></center>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group">
                                <p className="form-label">Pet's Name:</p>
                                <input type="text" name="petName" value={formData.petName} onChange={handleChange} required className="form-input" />
                            </div>
                            <div className="form-group">
                                <p className="form-label">Pet Type:</p>
                                <select name="petType" value={formData.petType} onChange={handleChange} required className="form-input">
                                    <option value="" disabled>Select a pet</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group full-width">
                            <p className="form-label">Pet Breed:</p>
                            <select name="petBreed" value={formData.petBreed} onChange={handleChange} required className="form-input">
                                <option value="" disabled>Select a breed</option>
                                {breeds.map((breed, index) => (
                                    <option key={index} value={breed}>{breed}</option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group">
                                <p className="form-label">Age:</p>
                                <input type="number" name="petAge" value={formData.petAge} onChange={handleChange} required className="form-input" />
                            </div>
                            <div className="form-group">
                                <p className="form-label">Colour:</p>
                                <input type="text" name="petColor" value={formData.petColor} onChange={handleChange} required className="form-input" />
                            </div>
                        </div>
                        <br />
                        <div className="form-group full-width">
                            <p className="form-label">Upload Photo:</p>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="form-input" />
                        </div>
                        <br />
                        {formData.petPhoto && (
                            <div className="form-group full-width">
                                <p className="form-label">Preview:</p>
                                <img src={URL.createObjectURL(formData.petPhoto)} alt="Pet Preview" className="preview-image" />
                            </div>
                        )}
                        <br />
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="image-container">
                <img src={process.env.PUBLIC_URL + "/images/addapet.avif"} alt="Cute Pet" className="pet-image" />
            </div>
        </div>
    );
}

export default PetRegistrationBox;