var mongoose = require('mongoose');
const Course = require('./course');
//const Channel = require('./channel');


var Schema = mongoose.Schema;

var preferenceSchema = new Schema({    
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    matrix: [[Number]],
    users: [String],
    groupSize: Number,
    deadline: {type: Date, default: null} 
});

module.exports = mongoose.model('Preference', preferenceSchema);

