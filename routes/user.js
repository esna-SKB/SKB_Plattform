var express = require('express');
var router = express.Router();
const User = require('../models/user');
const UserSession = require('../models/UserSession');

router.route('/')
	//get all users
	.get((req, res, next) => {
		User.find({},{}, function(err, users){
			if (err) {
	           console.log('error occured in the database');
	           return res.send('error occured in the database');
			}
	       	else {
				return res.send(users);
	       	}
		})
	})

router.route('/:email')
	// get one specific user by email
	.get((req, res, next) => {
		var email = req.params.email;
		User.findOne({email: email},{_id:0, firstname:1, lastname:2, email:3, isTeacher:4, isAdmin:5, isValide:6}, function(err, user){
			if (err){
	           console.log('error occured in the database');
	           return res.send('error occured in the database');
			} else {
				return res.send(user);
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
						, isTeacher : isTeacher, isAdmin : isAdmin, isValide : isValide}
						, {new: true}, function(err, updatedUser){
					if (err){
						console.log('error occured in the database while updating user');
						return res.send({success : false, message : "user is not updated"});
					}else if(updatedUser == null){
						return res.send({success : false, message : "user: " + oldEmail + " is not in database"});
					} else {
			       		return res.send({success : true, message : "user is updated", object: updatedUser});
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
				return res.send({success : false, message : "user could no be deleted, error accured while update"});
			} else if(affected.n == 0){
				return res.send({success : true, message : "user to delete counld not be found"});
			} else {
				return res.send({success : true, message : "course is deleted"})
			}
		})
	})

	module.exports = router
