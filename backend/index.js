const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const CustomerModel = require('./models/Customer');
const PetModel = require('./models/Pet');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/';
    if (!require('fs').existsSync(uploadPath)) {
      require('fs').mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/petapp')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('Connection error', error.message));

// Customer login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  CustomerModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: 'Success' });
        } else {
          res.status(400).json({ message: 'The password is incorrect' });
        }
      } else {
        res.status(404).json({ message: 'No record existed' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Server error', error: err.message }));
});

// Customer registration
app.post('/register', (req, res) => {
  console.log('Register Route Triggered');
  console.log('Request Body:', req.body);
  CustomerModel.create(req.body)
    .then((customers) => res.json({ message: 'Customer registered successfully', customer: customers }))
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Error inserting data', error: err.message });
    });
});

// Pet registration
app.post('/register-pet', (req, res) => {
  upload.single('petPhoto')(req, res, (err) => {
    console.log('Pet Registration Route Triggered');
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    console.log('Multer Error Details:', err ? err.message : 'No error');

    if (err) {
      console.error('Multer error:', err.message, err.stack);
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }

    const { petName, petType, petBreed, petAge, petColor } = req.body;
    const petPhoto = req.file ? `/uploads/${req.file.filename}` : null;

    if (!petName || !petType || !petBreed || !petAge || !petColor) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const petData = {
      petName,
      petType,
      petBreed,
      petAge,
      petColor,
      petPhoto,
    };

    PetModel.create(petData)
      .then((pet) => {
        res.json({ message: 'Pet registered successfully', pet });
      })
      .catch((err) => {
        console.error('Error saving pet to MongoDB:', err);
        res.status(500).json({ message: 'Error registering pet', error: err.message });
      });
  });
});

// Get all pets
app.get('/pets', async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).json({ message: 'Error fetching pets', error: err.message });
  }
});

// Update a pet
app.put('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { petName, petType, petBreed, petAge, petColor } = req.body;
    const updatedPet = await PetModel.findByIdAndUpdate(
      id,
      { petName, petType, petBreed, petAge, petColor },
      { new: true, runValidators: true }
    );
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet updated successfully', pet: updatedPet });
  } catch (err) {
    console.error('Error updating pet:', err);
    res.status(500).json({ message: 'Error updating pet', error: err.message });
  }
});

// Delete a pet
app.delete('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPet = await PetModel.findByIdAndDelete(id);
    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    console.error('Error deleting pet:', err);
    res.status(500).json({ message: 'Error deleting pet', error: err.message });
  }
});

// Catch-all route for 404 errors
app.use((req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});