var express = require('express');
var router = express.Router();
const Course = require('../models/course');

router.route('/')
	//get all courses
	.get((req, res, next) => {
		Course.find({},{}, function(err, courses){
			if (err)
	           console.log('error occured in the database');
	       	else {
				return res.send(courses); 
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
	           return res.send({
			    success: false,
			    message: 'Error: Server error'
			  });
			}else if(otherCourse.length > 0){
				console.log(otherCourse + " length is " + otherCourse.length); 
				return res.send({
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
					res.send({
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
		console.log(name); 
		Course.findOne({name: name},{/*_id:0, firstname:1, lastname:2, email:3, isTeacher:4, isAdmin:5 */},
		function(err, course){
			if (err)
	           console.log('error occured in the database');
	       	else {
				return res.send(course); 
	       	}
		})
	})

	.put((req, res, next) => {
		const { body } = req; 
		const { name } = body;
		const { teacher } = body;
		const { description } = body;

		var oldName = req.params.name; 

   		Course.findOneAndUpdate({ name: oldName }, { name : name, teacher : teacher, description: description }, function(err){
   			if (err) {
   				console.log("error accured while course update");
   			} else {
   				res.send({success : true, message : "course is updated"});
   			}
   		});
	})

	//deletes one User from DataBase 
	.delete((req, res, next) => {
		var name = req.params.name; 

		User.deleteOne({name : name}, function(err, course){
			if (err)
	           console.log('error occured in the database');
	       	else {
				return res.send(course); 
	       	}
		})
	})

	module.exports = router

