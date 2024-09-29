// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 100000 }, // Starting virtual balance
  portfolio: { type: Map, of: Number, default: {} },
  totalPortfolioValue: { type: Number, default: 100000 },
  percentageGain: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
