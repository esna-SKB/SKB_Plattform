var express = require('express');
var router = express.Router();
const User = require('../models/user');
const UserSession = require('../models/UserSession');
const Course = require('../models/course');
const Group = require('../models/group');
const Enrollment = require('../models/enrollment');

router.route('/')
	//get all users
	.get((req, res, next) => {

		User.find({},{}, function(err, users){

			if (err) {
	           console.log('error occured in the database');
	           return res.status(500).send('error occured in the database');
			}
	       	else {
				return res.status(200).send(users);
	       	}
		})
	})

router.route('/:email')
	// get one specific user by email
	.get((req, res, next) => {
		var email = req.params.email;
		User.findOne({email: email},{}, function(err, user){
			if (err){
	           console.log('error occured in the database');
	           return res.status(500).send({success:false, message:'error occured in the database'});
			} else {
				return res.status(200).send(user);
	       	}
		})
	})
	//update one User
	.put((req, res, next) => {

		const { body } = req;
		var updateUser = body;
		const { email } = body; //email maybe can not be updated
		/*
		{firstname : firstname, lastname : lastname, email : email
		, isTeacher : isTeacher, isAdmin : isAdmin, isValide : isValide
		, description : description, iCan : iCan, iLearn : iLearn, iTeach : iTeach
		, website : website, picturedata: picturedata, type: type}
		*/

		var oldEmail = req.params.email;

		User.find({email: email}, function(err, otherUsers){
			if(err) {
				console.log("error occured in the database")
				return res.send('error occured in the database');
			}else if(oldEmail != email && otherUsers.length > 0){
				return res.send({success : false, message : "user with the new email already exists"});
			}else {
				User.findOneAndUpdate({email: oldEmail}
					, updateUser
					, {new: true}, function(err, updatedUser){
					if (err){
						console.log('error occured in the database while updating user');
						return res.status(500).send({success : false, message : "user is not updated"});
					}else if(updatedUser == null){
						return res.status(401).send({success : false, message : "user: " + oldEmail + " is not in database"});
					} else {
			       		return res.status(200).send({success : true, message : "user is updated", object: updatedUser});
			       	}
				})
			}
		})
	})

	//deletes one User from DataBase
	.delete((req, res, next) => {
		var email = req.params.email;

		User.deleteOne({email: email}, function(err, affected){
			if (err) {
				return res.status(500).send({success : false, message : "user could no be deleted, error occured while update"});
			} else if(affected.n == 0){
				return res.status(404).send({success : true, message : "user to delete could not be found"});
			} else {
				return res.status(200).send({success : true, message : "user is deleted"})
			}
		})
	})

router.route('/:email/course')
	.get((req, res, next) => {
		var email = req.params.email;
		User.findOne({email: email},{},function(err, user){
			if (err) return res.status(500).send('error occured in the database');
			else if (user == null) return res.status(401).send('user not fount');
	       	else {
	       		Enrollment.find({user:user._id}).populate({path: 'course', populate: {path:'teacher', model:'User'} }).exec(function(err, enroll){
	       			if(err) return res.status(500).send('error occured in the database');
	       			else{
	       				return res.status(200).send(enroll.map(c => c.course));
	       			}
	       		})
	       	}
		})
	})

	

router.route('/:email/group')

	//get all Groups of User
	.get((req, res, next) => {
		var email = req.params.email;
		User.findOne({email: email},{})
		.populate({path:'grouplist', model: 'Group', populate:{path:'course', model:'Course'}})
		//.populate({path:'course', populate:{path:'teacher', model:'User'}})
		
		/*.populate({path:'members', model:'User'})*/
		.exec(function(err, user){
			if (err) {
				console.log("error in exec group")
			return res.status(500).send('error occured in the database');}
			else if (user == null) 
				return res.status(401).send('user not fount');
	       	else {
					/*user.grouplist
						.populate({path:'members', model:'User'})
						.populate({path:'course', populate:{path:'teacher', model:'User'}})
						.exec(function(err,groups){
								if(err){ 
									console.log("error in exec group")
								return res.status(500).send('error occured in the database');}
								else{*/
									return res.status(200).send(user.grouplist);	
								/*}
						})*/
	
			}
		})
	})


	module.exports = router
