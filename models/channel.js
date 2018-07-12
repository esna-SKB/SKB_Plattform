const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user');

var Schema = mongoose.Schema;


const ChannelSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = module.exports = mongoose.model('Channel', ChannelSchema);
