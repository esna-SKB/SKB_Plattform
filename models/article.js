/**good to know:

The refPath property above means that mongoose will look at the connections.kind path
 to determine which model to use for populate(). 
In other words, the refPath property enables you to
 make the ref property dynamic.
 http://mongoosejs.com/docs/populate.html#dynamic-ref
*/

var mongoose = require('mongoose');
const Course = require('./course');
const User = require('./user');
const Group = require('./group');
//const Channel = require('./channel');


var Schema = mongoose.Schema;

var articleSchema = new Schema({
	theChosenModel: {
			kind: String,			// write 'Course' , 'Group' or 'Channel'
			ModelId : {type: Schema.Types.ObjectId, refPath: 'theChosenModel.kind'} //save the Id of the group / course or channel
			},
    headline: String,
	NameOfModel: String,
    data: String,
    type: String,
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

