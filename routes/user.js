var express = require('express');
var router = express.Router();
const User = require('../models/user');
const UserSession = require('../models/UserSession');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

router.route('/')
	//get all users
	.get((req, res, next) => {
		User.find({},{_id:0, firstname:1, lastname:2, email:3, isTeacher:4, isAdmin:5, isValide:6, description:7, iCan:8, iLearn:9,iTeach:10,website:11}, function(err, users){
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
		User.findOne({email: email},{_id:0, firstname:1, lastname:2, email:3, isTeacher:4, isAdmin:5, isValide:6, description:7, iCan:8, iLearn:9,iTeach:10,website:11}, function(err, user){
			if (err){
	           console.log('error occured in the database');
	           return res.status(500).send('error occured in the database');
			} else {
				return res.status(200).send(user);
	       	}
		})
	})
	//update one User
	.put((req, res, next) => {
		const { body } = req;
		const { firstname } = body;
		const { lastname } = body;
		const { email } = body; //email maybe can not be updated
		const { isTeacher } = body;
		const { isAdmin } = body;
		const { isValide } = body;
		const { isCan } = body;
		const { isLearn } = body;
		const { isTeach } = body;
		const { description } = body;
		const { website } = body;

		var oldEmail = req.params.email;

		User.find({email: email}, function(err, otherUsers){
			if(err) {
				console.log("error occured in the database")
				return res.send('error occured in the database');
			}else if(oldEmail != email && otherUsers.length > 0){
				return res.send({success : false, message : "user with the new email already exists"});
			}else {
				User.findOneAndUpdate({email: oldEmail}
					,{firstname : firstname, lastname : lastname, email : email
						, isTeacher : isTeacher, isAdmin : isAdmin, isValide : isValide, description : description, iCan : iCan, iLearn : iLearn, iTeach : iTeach, website : website}
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



	module.exports = router
