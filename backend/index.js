require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FormData = require('./Formdata');

const app = express();
const PORT = 5000;

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Middlewares
app.use(cors());
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for form-urlencoded body

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// POST route
app.post('/submit-form', async (req, res) => {
  try {
    console.log("📥 Received form data:", req.body);

    const { name, phone, email, message } = req.body;

    const newEntry = new FormData({ name, phone, email, message });
    await newEntry.save();

    res.status(201).json({ success: true, message: 'Form data saved successfully' });
  } catch (error) {
    console.error('❌ Error saving form data:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
