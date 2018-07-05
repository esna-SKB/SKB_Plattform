var mongoose = require('mongoose');
const User = require('./user');
const Group = require('./group');

var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: {
    	type: String,
    	default: ''
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
    	type: String,
    	default: ''
    },
    isFree: {
        type: Boolean,
        default: true
    },
    content:{
        type: [String],
        default: []
    },
	grouplist:{
		type: [{ type: Schema.Types.ObjectId,
        ref: "Group"}],
		default: []
	},
	
	groupSizes: {
		type: Number,
		default: 2	
	},
	
	groupPrefenceDeadline:{
		type: Date,
		default: Date.now
	},
	
	withHomework: {
		type: Boolean,
		default: false
	}
	
	/*PreferenceList: {
		type: [{type: Schema.Types.ObjectId, ref: "Homework"}],
		default: []
	}*/
	
	/*Homeworks: {
		type: [{type: Schema.Types.ObjectId, ref: "Homework"}],
		default: []
	}*/
});

module.exports = mongoose.model('Course', courseSchema);
