var express = require('express');
var router = express.Router();
const Group = require('../models/group');


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
	.post((req, res, next) => {
		const { body } = req;
		const { name } = body; 
		const { members } = body; //array
		const { course } = body; 
		const { description } = body;

		Group.find({name: name},{}, function(err, otherGroup){

			if (err){
	           console.log('error occured in the database');
	           return res.status(500).send({
			    success: false,
			    message: 'Error: Server error'
			  });
			}else if(otherGroup.length > 0){
				console.log(otherGroup + " length is " + otherGroup.length); 
				return res.status(404).send({
					success: false,
					message: "This Group exists allready"
				}); 
			} else {
				//if there is no group with that name yet
				// Save the new group
				const newGroup = new Group();
				newGroup.name = name;
				newGroup.members = members;
				newGroup.course = course; 
				newGroup.description = description;
				newGroup.save(function(err){
					if(err) return res.status(500).send('error occured in the database'); 
					else {
					console.log("new Group is saved! "+ newGroup.name);
					return res.status(200).send({
						success: true,
						message: "new Group is saved"
						});
					}
				});
			}
		})
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
				console.log("this is the getted grou" + group )
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
				console.log("this is the getted group" + group.members )
				return res.status(200).send(group.members); 
	       	}
		})
	})
		
	
	module.exports = router

