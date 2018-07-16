var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

router.route('/')

	.post((req, res, next) => {

		const { body } = req;
		const { ModelId } = body;
		const { kind } = body;
		const { email } = body;


		User.findOne({email: email}, {}).exec(function(err, user){
			if (err) return res.status(500).send('1');
			if(user == null) return res.status(404).send('user does not exists');

			/*Course.findOne({name:name}, {}).exec(function(err, course){
				if(err) return res.status(500).send('2');
				if(course == null) return res.status(404).send('course does not exists');*/

				Enrollment.findOne({user:user._id, 'theChosenModel.ModelId':ModelId}).exec(function(err, enroll){
					if(err) return res.status(500).send('');
					if(enroll != null) return res.status(200).send({success: false, message: 'enrollment already exists'});
					else{
						var en = new Enrollment();
						en.user = user._id;
						en.theChosenModel.kind = kind;
						en.theChosenModel.ModelId =ModelId;
						console.log(en);
						en.save(function(err){
							if(err) return res.status(500).send('err');
							else {
							return res.status(200).send({
								success: true,
								message: "new Enrollment is saved"
								
								});
							}
						})
					}
				})

		})

	})

	
router.route('/email/:email/id/:id')	
	.delete((req, res, next) => {
		var email = req.params.email; 
		var id = req.params.id; 
		
		User.findOne({email: email}, {}).exec(function(err, user){
			if (err) return res.status(500).send('1');
			if(user == null) return res.status(404).send('user does not exists');

		/*	Course.findOne({name:name}, {}).exec(function(err, course){
				if(err) return res.status(500).send('2');
				if(course == null) return res.status(404).send('course does not exists');
				*/
				Enrollment.deleteOne({'theChosenModel.ModelId':id, user:user._id}, function(err, affected){
					if (err)
			           return res.status(500).send({success : false, message : "error accured in database"});
			       	else if(affected.n == 0){
			       		return res.status(404).send({success : true, message : "user was not in course"});
			       	} else{
						return res.status(200).send({success : true, message : "user is signed out of course"});
			       	}
				})
		
		})
	})
	
	.post((req, res, next) => {
		var email = req.params.email; 
		var id = req.params.id; 
		
		User.findOne({email: email}, {}).exec(function(err, user){
			if (err) return res.status(500).send('1');
			if(user == null) return res.status(404).send('user does not exists');

		/*	Course.findOne({name:name}, {}).exec(function(err, course){
				if(err) return res.status(500).send('2');
				if(course == null) return res.status(404).send('course does not exists');
				*/
				Enrollment.findOne({'theChosenModel.ModelId':id, user:user._id}, function(err, affected){
					if (err)
			           return res.status(500).send({success : false, message : "error accured in database"});
			       	else if(affected === null){
			       		return res.status(404).send({success : false, message : "user was not enrolled"});
			       	} else{
						return res.status(200).send({success : true, message : "user is enrolled"}); 
			       	}
				})
		
		})
	})
module.exports = router
