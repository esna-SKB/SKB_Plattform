var mongoose = require('mongoose');
const User = require('./user');
const Course = require('./course');

var Schema = mongoose.Schema;

var enrollmentSchema = new Schema({
    user: {
    	type: Schema.Types.ObjectId,
        ref: "User"
    },
	theChosenModel: {
		kind: String,			// write 'Course' , 'Group' or 'Channel'
		ModelId : {type: Schema.Types.ObjectId, refPath: 'theChosenModel.kind'} //save the Id of the group / course or channel
	},
    
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);