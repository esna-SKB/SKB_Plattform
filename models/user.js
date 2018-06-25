const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({

  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isTeacher: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isValide: {
    type: Boolean,
    default: false
  },
   description: {
    type: String,
    default: ''
  },
  iCan: {
    type: String,
    default: ''
  },
  iLearn: {
    type: String,
    default: ''
  },
  iTeach: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  picturedata:{
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
});
UserSchema.methods.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  console.log('pass' + password);
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
