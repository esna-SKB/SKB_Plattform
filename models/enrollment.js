var mongoose = require('mongoose');
const User = require('./user');
const Course = require('./course');

var Schema = mongoose.Schema;

var enrollmentSchema = new Schema({
    user: {
    	type: Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
    
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);