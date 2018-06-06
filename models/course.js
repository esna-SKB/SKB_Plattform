var mongoose = require('mongoose');
const User = require('./user');

var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: {
    	type: String,
    	default: ''
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
    	type: String,
    	default: ''
    }
});

module.exports = mongoose.model('Course', courseSchema);
