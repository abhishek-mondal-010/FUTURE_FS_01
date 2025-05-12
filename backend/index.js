require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FormData = require('./Formdata');

const app = express();
const PORT = process.env.PORT || 5000; // 🔁 Let Render assign the port dynamically

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(cors()); // 🛡️ If needed, you can add origin: 'https://your-frontend.onrender.com'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('🌐 API is running...');
});

// Form submission route
app.post('/submit-form', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    console.log("📥 Received form data:", req.body);

    const newEntry = new FormData({ name, phone, email, message });
    await newEntry.save();

    res.status(201).json({ success: true, message: 'Form data saved successfully' });
  } catch (error) {
    console.error('❌ Error saving form data:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
