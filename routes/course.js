var express = require('express');
var router = express.Router();
const Course = require('../models/course');

router.use('/:name/article', require('./article'))
router.use('/:name/group', require('./group'))

router.route('/')
	//get all courses
	.get((req, res, next) => {
		Course.find({},{}, function(err, courses){
			if (err) {
				console.log('error occured in the database');
	        	return res.status(500).send('error occured in the database');
			} else {
				return res.status(200).send(courses); 
	       	}
		})
	})

	//post new course
	.post((req, res, next) => {
		const { body } = req;
		const { name } = body;
		const { teacher } = body;
		const { description } = body;

		Course.find({name: name},{_id:0}, function(err, otherCourse){

			if (err){
	           console.log('error occured in the database');
	           return res.status(500).send({
			    success: false,
			    message: 'Error: Server error'
			  });
			}else if(otherCourse.length > 0){
				console.log(otherCourse + " length is " + otherCourse.length); 
				return res.status(401).send({
					success: false,
					message: "This Course exists allready"
				}); 
			} else {
				//if there is no course with that name jet
				// Save the new course
				const newCourse = new Course();
				newCourse.name = name;
				newCourse.teacher = teacher;
				newCourse.description = description;
				newCourse.save(function(err){
					if(err) handleError(err); 
					else {
					return res.status(200).send({
						success: true,
						message: "new Course is saved"
						});
					}
				});
			}
		})
	})

router.route('/:name')
	
	.get((req, res, next) => {
		var name = req.params.name; 
		Course.findOne({name: name},{},
		function(err, course){
			if (err){
				console.log('error occured in the database');
	        	return res.status(500).send('error occured in the database');
	       	}else {
				return res.status(200).send(course); 
	       	}
		})
	})

	.put((req, res, next) => {
		const { body } = req; 
		const { name } = body;
		const { teacher } = body;
		const { description } = body;

		var oldName = req.params.name; 

		if(oldName != name){
			Course.find({name : name},{}, function(err, courses){
				if(err){
					return res.status(500).send({success : false, message : "error accured in database"})
				}else if(courses.length > 0){
					return res.status(401).send({success : false, message : "new name for course already exists"})
				} else {
					//valide update new name
					Course.update(
						{ name: oldName }, { name : name, teacher : teacher, description: description }
						, function(err, affected){
						if (err) {
							return res.status(500).send({success : false, message : "course could no be updaten, error accured while update"});
						} else if(affected.n == 0){
							return res.status(401).send({success : false, message : "course to update counld not be found"});
						} else {
							return res.status(200).send({success : true, message : "course is updated"})
						}
					});
				}
			})
		} else {
			//valide update no new name
	   		Course.update(
	   			{ name: oldName }, {teacher : teacher, description: description }
	   			, function(err, affected){
	   			if (err) {
	   				console.log("error accured while course update");
	   				return res.status(500).send({success : false, message : "course could no be updaten, error accured while update"});
	   			} else if(affected.n == 0){
					return res.status(401).send({success : false, message : "course to update counld not be found"});
				} else {
					return res.status(200).send({success : true, message : "course is updated"})
				}
	   		});
		}
	})

	//deletes one Course from DataBase 
	.delete((req, res, next) => {
		console.log('delete' + req.params.name)
		var name = req.params.name; 

		Course.deleteOne({name : name}, function(err, affected){
			if (err)
	           return res.status(500).send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.status(401).send({success : true, message : "course is was not in database"});
	       	} else{
				return res.status(200).send({success : true, message : "course is deleted"}); 
	       	}
		})
	})

	module.exports = router

