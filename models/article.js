var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    headline: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: String, 
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article', articleSchema);
