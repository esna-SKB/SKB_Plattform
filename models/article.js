var mongoose = require('mongoose');
const Course = require('./course');
const User = require('./user');
const Group = require('./group');


var Schema = mongoose.Schema;

var articleSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    headline: String,
    data: String,
    type: String,
    dataName: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }], 
    text: String,
    created_at: {type: Date, default: '1994-12-12'}
});

module.exports = mongoose.model('Article', articleSchema);

