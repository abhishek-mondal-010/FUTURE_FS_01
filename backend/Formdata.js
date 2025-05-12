const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String
});

module.exports = mongoose.model('Formdata', formDataSchema);
