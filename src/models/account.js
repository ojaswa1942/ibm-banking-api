const mongoose = require('mongoose');

const { Schema } = mongoose;

const Account = new Schema({
  // account number, balance, name,, type
  number: {
    type: Number,
    default: () => Math.floor(Math.random() * 999999999) + +1000000000,
    index: { unique: true },
  },
  balance: {
    type: Number,
    // opening balance
    default: 25000,
    min: [0, 'Insufficient Balance'],
  },
  created: { type: Date, default: Date.now },
  type: { type: String, enum: [`SAVINGS`, `CURRENT`], default: `SAVINGS` },
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  email: {
    type: String,
    index: true,
  },
});

module.exports = mongoose.model('Account', Account);
