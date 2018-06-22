const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
	email: String,
    type: String,
    data: Buffer
});

module.exports = mongoose.model('Image', ImageSchema);