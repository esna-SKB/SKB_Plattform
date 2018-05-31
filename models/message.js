var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    fromUser: {
        type: String,//Schema.Types.ObjectId,
        default: "fUser"
    },
    toUser: {
        type: String,
        default: "tUser"
    },
    text: {
        type:String,
        default: ""
    },
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Message', messageSchema);
