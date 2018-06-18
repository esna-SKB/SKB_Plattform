var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');
const User = require('../models/user');


router.route('/')
	//get all courses
	.get((req, res, next) => {
		Course.find({}).populate('teacher').exec(function(err, courses){
			if (err) {
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
		const { isFree } = body;


		Course.find({name: name}).exec(function(err, otherCourse){
			if (err){
	           return res.status(500).send({
			    success: false,
			    message: 'Error: Server error'
			  });
			}else if(otherCourse.length > 0){
				return res.status(404).send({
					success: false,
					message: "This Course exists already"
				});
			} else {
				//if there is no course with that name jet
				// Save the new course
				User.findOne({email:teacher}).exec(function(err, user){
					if(err) return res.status(500).send("Error: Server error");
					else if(user == null || user.teacher == false) return res.status(404).send("could not find teacher");
					else{
						const newCourse = new Course();
						newCourse.name = name;
						newCourse.teacher = user._id;
						newCourse.description = description;
						newCourse.isFree = (isFree==null) ? true: isFree;
						newCourse.save(function(err){
							if(err) return res.status(500).send("could not save course");
							else {
							return res.status(200).send({
								success: true,
								message: "new Course is saved"
								});
							}
						});
					}
				})

			}
		})
	})

//get /course/:name/user/ get all users enrolled in one course
router.route('/:name/user')
	.get((req, res, next) => {
		var name = req.params.name;
		Course.findOne({name: name},{}, function(err, course){
			if (err){
	        	return res.status(500).send('error occured in the database');
	       	} else if(course == null){
	       		return res.status(404).send('course not found');
	       	} else {
	       		Enrollment.find({course:course._id}).populate('user').exec(function(err, enrolls){
	       			if(err) return res.status(500).send('error occured in the database');
	       			else if(enrolls == 0) res.status(204).send('there are no user in that course');
	       			else{
	       				var users = enrolls.map(c => c.user)
	       				return res.status(200).send(users);
	       			}
	       		})
	       	}
		})
	})


router.route('/:name')

	.get((req, res, next) => {
		var name = req.params.name;
		Course.findOne({name: name}).populate('teacher').exec(function(err, course){
			if (err) return res.status(500).send('error occured in the database');
	       	else if(course == null) return res.status(404).send('course not found');
	       	else {
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


		Course.findOne({name : name},{}, function(err, course){
			if(err){
				return res.status(500).send({success : false, message : "error accured in database"})
			}else if(course != null && oldName != name){
				return res.status(404).send({success : false, message : "new name for course already exists"})
			} else {
				//valide update new name
				User.findOne({email:teacher}).exec(function(err, user){
					if(err) return res.status(500).send({success : false, message : "error accured in database"})
					else if(user == null) res.status(404).send({success : false, message : "teacher not found"})
					else {
						Course.update(
							{ name: oldName }, { name : name, teacher : user._id, description: description }
							, function(err, affected){
							if (err) {
								return res.status(500).send({success : false, message : "course could no be updaten, error accured while update"});
							} else if(affected.n == 0){
								return res.status(404).send({success : false, message : "course to update counld not be found"});
							} else {
								return res.status(200).send({success : true, message : "course is updated"})
							}
						});
					}
				})
			}
		})
	})

	//deletes one Course from DataBase
	.delete((req, res, next) => {
		var name = req.params.name;

		Course.deleteOne({name : name}, function(err, affected){
			if (err)
	           return res.status(500).send({success : false, message : "error accured in database"});
	       	else if(affected.n == 0){
	       		return res.status(404).send({success : true, message : "course was not in database"});
	       	} else{
				return res.status(200).send({success : true, message : "course is deleted"});
	       	}
		})
	})

module.exports = router
