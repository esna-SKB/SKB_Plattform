const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    type: String,
    data: Buffer
});

module.exports = mongoose.model('Image', ImageSchema);