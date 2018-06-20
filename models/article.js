var mongoose = require('mongoose');
const Course = require('./course'); 
const User = require('./user');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    headline: String,
    file: {
        data: Buffer,
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: String, 
    dunn: 'AHHHHHHH!!!!'
    created_at: {type: Date, default: '1994-12-12'}
});

module.exports = mongoose.model('Article', articleSchema);
