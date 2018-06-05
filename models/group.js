const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user');
const User = require('./course');

var Schema = mongoose.Schema;


const GroupSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course"
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = module.exports = mongoose.model('Group', GroupSchema);
