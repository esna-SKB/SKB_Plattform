var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: String
});

mongoose.model('Course', courseSchema);