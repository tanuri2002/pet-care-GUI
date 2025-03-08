const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  petBreed: { type: String, required: true },
  petAge: { type: Number, required: true, min: 0 }, // Changed to Number with min validation
  petColor: { type: String, required: true },
  petPhoto: { type: String }, // Optional photo path or URL
  createdAt: { type: Date, default: Date.now }, // Tracks when the pet was registered
});

module.exports = mongoose.model('Pet', petSchema);