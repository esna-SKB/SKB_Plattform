var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    surname: String,
    name: String,
    isTeacher: Boolean,
    isAdmin: Boolean,
    created_at: {type: Date, default: Date.now}
});

mongoose.model('User', userSchema);