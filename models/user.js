const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); // passportLocalMongoose allows us to create users easily

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// we need to "plugin" passportLocalMongoose in order to use its functions for our users
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
