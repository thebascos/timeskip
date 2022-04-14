const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('Customer', customerSchema);

