var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    headline: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: String
});

mongoose.model('Article', articleSchema);