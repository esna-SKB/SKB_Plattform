var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    name: {
    	type: String,
    	default: ''
    },
    teacher: {
        type: String,
        default: ""
    },
    description: {
    	type: String,
    	default: ''
    }
});

module.exports = mongoose.model('Course', courseSchema);
