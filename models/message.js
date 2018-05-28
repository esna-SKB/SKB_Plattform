var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: String,
    created_at: {type: Date, default: Date.now}
});

mongoose.model('Message', messageSchema);
