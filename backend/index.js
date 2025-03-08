const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const CustomerModel = require('./models/Customer');
const PetModel = require('./models/Pet');
const ContactModel = require('./models/Contact');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/';
        const fs = require('fs');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
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
    limits: { fileSize: 5 * 1024 * 1024 },
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/petapp')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error.message));

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Customer registration
app.post('/register', [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    console.log('Register Route Triggered');
    console.log('Request Body:', req.body);
    try {
        const { email, password, ...otherData } = req.body;
        const customer = await CustomerModel.create({
            ...otherData,
            email,
            password,
        });
        res.status(201).json({ message: 'Customer registered successfully', customer });
    } catch (err) {
        console.error('Error registering customer:', err);
        res.status(500).json({ message: 'Error inserting data', error: err.message });
    }
});

// Customer login
app.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Login Route Triggered');
    console.log('Email:', email);
    console.log('Provided Password:', password);
    try {
        const user = await CustomerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No record existed' });
        }

        console.log('Stored Password:', user.password);
        console.log('Password Match:', password === user.password);
        if (password !== user.password) {
            return res.status(400).json({ message: 'The password is incorrect' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );
        res.json({ message: 'Success', token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Pet registration (without authentication)
// Pet registration (without authentication)
app.post('/register-pet', upload.single('petPhoto'), [
    body('petName').notEmpty().withMessage('Pet name is required'),
    body('petType').notEmpty().withMessage('Pet type is required'),
    body('petBreed').notEmpty().withMessage('Pet breed is required'),
    body('petAge').notEmpty().withMessage('Pet age is required').isInt({ min: 0 }).withMessage('Pet age must be a positive number'),
    body('petColor').notEmpty().withMessage('Pet color is required'),
], async (req, res) => {
    // Handle multer errors
    if (req.fileValidationError) {
        return res.status(400).json({ message: 'File upload error', error: req.fileValidationError });
    }
    if (req.file && req.file instanceof Error) {
        return res.status(400).json({ message: 'File upload error', error: req.file.message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    try {
        const { petName, petType, petBreed, petAge, petColor } = req.body;
        const petPhoto = req.file ? `/uploads/${req.file.filename}` : null;

        const petData = {
            petName,
            petType,
            petBreed,
            petAge: Number(petAge),
            petColor,
            petPhoto,
        };

        const newPet = await PetModel.create(petData);
        res.status(201).json({ message: 'Pet registered successfully', pet: newPet });
    } catch (error) {
        console.error('Error saving pet to MongoDB:', error);
        res.status(500).json({ message: 'Error registering pet', error: error.message });
    }
});
// Get all pets (still requires authentication)
app.get('/pets', authenticateToken, async (req, res) => {
    try {
        const pets = await PetModel.find({ owner: req.user.id });
        res.json(pets);
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).json({ message: 'Error fetching pets', error: err.message });
    }
});

// Update a pet (still requires authentication)
app.put('/pets/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { petName, petType, petBreed, petAge, petColor } = req.body;
        const updatedPet = await PetModel.findOneAndUpdate(
            { _id: id, owner: req.user.id },
            { petName, petType, petBreed, petAge, petColor },
            { new: true, runValidators: true }
        );
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found or not authorized' });
        }
        res.json({ message: 'Pet updated successfully', pet: updatedPet });
    } catch (err) {
        console.error('Error updating pet:', err);
        res.status(500).json({ message: 'Error updating pet', error: err.message });
    }
});

// Delete a pet (still requires authentication)
app.delete('/pets/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPet = await PetModel.findOneAndDelete({ _id: id, owner: req.user.id });
        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found or not authorized' });
        }
        res.json({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.error('Error deleting pet:', err);
        res.status(500).json({ message: 'Error deleting pet', error: err.message });
    }
});

// Contact form submission
app.post('/submit-contact', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('message').notEmpty().withMessage('Message is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    try {
        const { name, email, message } = req.body;
        const contactData = { name, email, message };
        const newContact = await ContactModel.create(contactData);
        res.status(201).json({ message: 'Contact message submitted successfully', contact: newContact });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Error submitting contact message', error: error.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Catch-all route for 404 errors
app.use((req, res) => {
    console.log(`Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});