import React, { useState } from "react";
import "./petRegistrationBox.css";

function PetRegistrationBox() {
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    petColor: "",
    petPhoto: null, // Store the uploaded photo
  });

  const dogBreeds = ["Golden Retriever", "Labrador", "Beagle", "Poodle"];
  const catBreeds = ["Persian", "Siamese", "Maine Coon", "Bengal"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, petPhoto: file });
  };

  const handleSubmit = async (e) => {
       e.preventDefault();
   
       const formDataToSend = new FormData(); // Using FormData for file uploads
       formDataToSend.append("petName", formData.petName);
       formDataToSend.append("petType", formData.petType);
       formDataToSend.append("petBreed", formData.petBreed);
       formDataToSend.append("petAge", formData.petAge);
       formDataToSend.append("petColor", formData.petColor);
   
       if (formData.petPhoto) {
           formDataToSend.append("petPhoto", formData.petPhoto); // Add the photo file
       }
   
       try {
           const response = await fetch("http://localhost:5000/register-pet", {
               method: "POST",
               body: formDataToSend, // Send the FormData object directly
           });
   
           if (response.ok) {
               alert("Pet registered successfully!");
               setFormData({
                   petName: "",
                   petType: "",
                   petBreed: "",
                   petAge: "",
                   petColor: "",
                   petPhoto: null,
               });
           } else {
               const errorData = await response.json();
               alert(`Failed to register pet: ${errorData.message}`);
           }
       } catch (error) {
           console.error("Error registering pet:", error);
           alert("An error occurred. Please try again.");
       }
   };
   

    // Handle file upload logic (e.g., sending to a server)
    if (formData.petPhoto) {
      console.log("Uploaded file:", formData.petPhoto.name);
    }

  const breeds = formData.petType === "dog" ? dogBreeds : formData.petType === "cat" ? catBreeds : [];

  return (
    <div className="main-container">
      <div className="registration-box">
        <form onSubmit={handleSubmit}>
          <div className="topic">
            <p style={{ fontFamily: "Brush Script,cursive", fontSize: 20 }}>
              Add your Pet
            </p>
          </div>
          <br />

          <p style={{ fontFamily: "Brush Script,cursive" }}>Pet's Name:</p>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <p style={{ fontFamily: "Brush Script,cursive" }}>Pet Type:</p>
          <select
            name="petType"
            value={formData.petType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a pet
            </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <br />
          <br />

          <p style={{ fontFamily: "Brush Script,cursive" }}>Pet Breed:</p>
          <select
            name="petBreed"
            value={formData.petBreed}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a breed
            </option>
            {breeds.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <br />
          <br />

          <p style={{ fontFamily: "Brush Script,cursive" }}>Age:</p>
          <input
            type="text"
            name="petAge"
            value={formData.petAge}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <p style={{ fontFamily: "Brush Script,cursive" }}>Colour:</p>
          <input
            type="text"
            name="petColor"
            value={formData.petColor}
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <p style={{ fontFamily: "Brush Script,cursive" }}>Upload Photo:</p>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <br />
          <br />

          {formData.petPhoto && (
            <div>
              <p style={{ fontFamily: "Brush Script,cursive" }}>Preview:</p>
              <img
                src={URL.createObjectURL(formData.petPhoto)}
                alt="Pet Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <br />

          <button type="submit" style={{ fontFamily: "Brush Script,cursive" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PetRegistrationBox;

