const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
});

module.exports = mongoose.model('Customer', customerSchema);

