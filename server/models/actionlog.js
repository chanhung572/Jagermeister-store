const mongoose = require('mongoose');

const actionLogSchema = new mongoose.Schema({
  user: String,
  message: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActionLog', actionLogSchema);