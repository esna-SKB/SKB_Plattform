const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  members: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = module.exports = mongoose.model('Group', GroupSchema);
