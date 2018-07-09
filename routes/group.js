var express = require('express');
var router = express.Router();
const Group = require('../models/group');
Enrollment = require('../models/enrollment');


router.route('/course/:courseId')

	//get all groups of courseX
	.get((req, res, next) => {
		var courseID = req.params.name; 
		Group.find({course: courseID},{}, function(err, groups){
			if (err) {
				console.log('error occured in the database');
	        	return res.status(500).send('error occured in the database');
			} else {
				return res.status(200).send(groups); 
	       	}
		})
	})

	//post new group
	/*ErrorHandling checks: are all memebers in the course, are none of them in another group of the course -> it is indeed a new group,*/

	
	.post((req, res, next) => {
		const { body } = req;
		const { groupname } = body; 
		const { members } = body; //array
		const { courseId } = body; 
		const { description } = body;

		//if there is no group with those members for that course yet  (yet to implement)
		// Save the new group
		const newGroup = new Group();
		newGroup.name = groupname;
		newGroup.members = members;
		newGroup.course = courseId; 
		newGroup.description = description;
		newGroup.save(function(err){
			if(err) return res.status(500).send('error occured in the database'); 
			else {
			console.log("new Group is saved! "+ newGroup.name);
			return res.status(200).send({
				success: true,
				message: newGroup._id
				});
			}
		});
	})

router.route('/:id')
	
	/*GET group with specific id*/
	.get((req, res, next) => {
		var id = req.params.id; 
		Group.findOne({_id: id},{})
		.populate({path:'members', model: 'User' })
		.exec(function(err, group){
			if (err)return res.status(500).send('error occured in the database');
	       	else if(group == null) res.status(404).send('group could not be found');
	       	else {
				console.log("this is the getted group" + group.name )
				return res.status(200).send(group); 
	       	}
		})
	})
	
	/*update group with specific id*/
	.put((req, res, next) => {
		const { body } = req; 
		const { name } = body;
		const { members } = body;
		const { description } = body;

		var id = req.params.id; 

		
		Group.find({_id : id},{}, function(err, groups){
			if(err){
				return res.send({success : false, message : "error accured in database"})
			}else if(groups.length == 0 ){
				return res.send({success : false, message : "new name for group already exists"})
			} else {
				//valide update new name
				Group.update(
					{ _id: id }, { name : name, members : members, description: description }
					, function(err, affected){
					if (err) {
						return res.status(500).send({success : false, message : "group could no be updaten, error accured while update"});
					} else if(affected.n == 0){
						return res.status(404).send({success : false, message : "group to update counld not be found"});
					} else {
						return res.status(200).send({success : true, message : "group is updated"})
					}
				});
			}
		})
	})
	

	//deletes one Group from DataBase 
	.delete((req, res, next) => {
		console.log('delete' + req.params.id)
		var id = req.params.id; 

		Group.deleteOne({_id : id}, function(err, affected){
			if (err)
	           return res.status(500).send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.status(401).send({success : true, message : "group is was not in database"});
	       	} else{
				return res.status(200).send({success : true, message : "group is deleted"}); 
	       	}
		})
	})


router.route('/:id/members')
	
	/*get all members of a group */
	.get((req, res, next) => {
		var id = req.params.id; 
		Group.findOne({_id: id},{})
		.populate({path:'members', model: 'User' })
		.exec(function(err, group){
			if (err)return res.status(500).send('error occured in the database');
	       	else if(group == null) res.status(404).send('group could not be found');
	       	else {
				return res.status(200).send(group.members); 
	       	}
		})
	})
		
	
	module.exports = router

