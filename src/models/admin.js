const mongoose = require('mongoose');

const { Schema } = mongoose;

const Admin = new Schema({
  // Name of the admin user
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  // Hashed password
  password: {
    type: String,
    required: true,
  },
  // Role of the user - user/admin. user by default
  role: {
    type: String,
    enum: ['ADMIN'],
    default: 'ADMIN',
  },
});

module.exports = mongoose.model('Admin', Admin);
