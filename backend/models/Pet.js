// ./models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  petBreed: { type: String, required: true },
  petAge: { type: String, required: true }, // Could use Number if you want stricter typing
  petColor: { type: String, required: true },
  petPhoto: { type: String }, // Store the file path or URL of the uploaded photo
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pet', petSchema);