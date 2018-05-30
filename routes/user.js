var express = require('express');
var router = express.Router();
const User = require('../models/user');
const UserSession = require('../models/UserSession');

router.route('/')
	//get all users
	.get((req, res, next) => {
		User.find({},{}, function(err, users){
			if (err)
	           console.log('error occured in the database');
	       	else {
				return res.send(users); 
	       	}
		})
	})

router.route('/:email')
	// get one specific user by email
	.get((req, res, next) => {
		var email = req.params.email; 
		console.log(email); 
		User.findOne({email: email},{_id:0, firstname:1, lastname:2, email:3, }, function(err, user){
			if (err)
	           console.log('error occured in the database');
	       	else {
				return res.send(user); 
	       	}
		})
	})
	//update one User 
	.put((req, res, next) => {
		const { body } = req; 

		var email = req.params.email; 
		console.log(email); 
		User.findOne({email: email},{_id:0}, function(err, user){
			if (err)
	           console.log('error occured in the database');
	       	else {
	       		User.findByIdAndUpdate(user._id, { 
	       			$set: { 
	       				firstname: body.firstname, lastname: body.lastname, email: body.email,
	       				 isTeacher: body.isTeacher, isAdmin: body.isAdmin
	       				}
	       			}, {new: true }, function(err, updatedUser){
	       			if (err) return handleError(err);
	       			return res.send(updatedUser); 
	       		})
	       	}
		})
	})

	//deletes one User from DataBase 
	.delete((req, res, next) => {
		var email = req.params.email; 

		User.deleteOne({email: email}, function(err, user){
			if (err)
	           console.log('error occured in the database');
	       	else {
				return res.send(user); 
	       	}
		})
	})

	module.exports = router
